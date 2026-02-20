const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const USERS_FILE_PATH = path.join(__dirname, '..', 'data', 'users.json');
const pendingSignups = new Map(); // email -> pending signup payload
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const E164_PHONE_REGEX = /^\+[1-9]\d{7,14}$/;
const OTP_EXPIRY_MS = 5 * 60 * 1000;
const OTP_RESEND_COOLDOWN_MS = 30 * 1000;
const MAX_OTP_ATTEMPTS = 5;

function normalizeCountryCode(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits ? `+${digits}` : '+91';
}

const DEFAULT_COUNTRY_CODE = normalizeCountryCode(process.env.DEFAULT_COUNTRY_CODE || '+91');

function ensureUsersFileExists() {
  if (!fs.existsSync(USERS_FILE_PATH)) {
    fs.writeFileSync(USERS_FILE_PATH, '[]', 'utf8');
  }
}

function loadUsers() {
  try {
    ensureUsersFileExists();
    const content = fs.readFileSync(USERS_FILE_PATH, 'utf8');
    const parsed = JSON.parse(content || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load users from file:', error.message);
    return [];
  }
}

function persistUsers(userList) {
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(userList, null, 2), 'utf8');
}

const users = loadUsers();

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function normalizePhoneNumber(rawPhone = '') {
  const raw = String(rawPhone || '').trim();
  if (!raw) return '';

  if (raw.startsWith('+')) {
    return `+${raw.slice(1).replace(/\D/g, '')}`;
  }

  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  return `${DEFAULT_COUNTRY_CODE}${digits}`;
}

function maskPhoneNumber(phone = '') {
  if (!phone) return '';
  const visibleDigits = phone.slice(-4);
  const maskedCount = Math.max(0, phone.length - visibleDigits.length - 1);
  return `${phone.slice(0, 1)}${'*'.repeat(maskedCount)}${visibleDigits}`;
}

function sanitizeSignupInput(body = {}) {
  return {
    fullName: String(body.fullName || '').trim(),
    email: String(body.email || '').trim().toLowerCase(),
    password: String(body.password || ''),
    phone: normalizePhoneNumber(body.phone || ''),
  };
}

function validateSignupInput({ fullName, email, password, phone }) {
  if (!fullName || !email || !password || !phone) {
    return 'fullName, email, phone and password are required';
  }

  if (!EMAIL_REGEX.test(email)) {
    return 'Enter a valid email';
  }

  if (!E164_PHONE_REGEX.test(phone)) {
    return 'Enter a valid mobile number with country code';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }

  return null;
}

function isProduction() {
  return (process.env.NODE_ENV || '').toLowerCase() === 'production';
}

function allowDevOtpFallback() {
  return (
    !isProduction() &&
    String(process.env.ALLOW_DEV_OTP_FALLBACK || '').toLowerCase() === 'true'
  );
}

function hasTwilioVerifyConfig() {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_VERIFY_SERVICE_SID
  );
}

async function twilioVerifyRequest(path, payload) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  if (!accountSid || !authToken || !verifyServiceSid) {
    throw new Error('Twilio Verify is not configured');
  }

  const url = `https://verify.twilio.com/v2/Services/${verifyServiceSid}${path}`;
  const basicAuthToken = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuthToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Twilio Verify request failed');
  }

  return data;
}

async function dispatchSignupOtp(phone, fallbackOtp) {
  if (hasTwilioVerifyConfig()) {
    await twilioVerifyRequest('/Verifications', {
      To: phone,
      Channel: 'sms',
    });
    return { delivery: 'sms' };
  }

  if (!allowDevOtpFallback()) {
    throw new Error('SMS OTP service is not configured on server');
  }

  console.log(`DEV OTP for ${phone}: ${fallbackOtp}`);
  return { delivery: 'dev', devOtp: fallbackOtp };
}

async function validateSignupOtp(phone, otp, fallbackOtp) {
  if (hasTwilioVerifyConfig()) {
    try {
      const data = await twilioVerifyRequest('/VerificationCheck', {
        To: phone,
        Code: otp,
      });
      return data.status === 'approved';
    } catch (error) {
      const message = String(error.message || '').toLowerCase();
      if (
        message.includes('incorrect') ||
        message.includes('expired') ||
        message.includes('invalid') ||
        message.includes('not found')
      ) {
        return false;
      }
      throw error;
    }
  }

  return otp === fallbackOtp;
}

function getRetryAfterSeconds(lastSentAt) {
  return Math.ceil((OTP_RESEND_COOLDOWN_MS - (Date.now() - lastSentAt)) / 1000);
}

router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password, phone } = sanitizeSignupInput(req.body);
    const validationError = validateSignupInput({ fullName, email, password, phone });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const existingUser = users.find((u) => u.email === email || u.phone === phone);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const now = Date.now();
    const existingPending = pendingSignups.get(email);

    if (existingPending && now - existingPending.lastSentAt < OTP_RESEND_COOLDOWN_MS) {
      return res.status(429).json({
        message: `Please wait ${getRetryAfterSeconds(existingPending.lastSentAt)}s before requesting another OTP`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = hasTwilioVerifyConfig() ? null : generateOtp();
    const expiresAt = now + OTP_EXPIRY_MS;

    const otpDispatch = await dispatchSignupOtp(phone, otp);

    pendingSignups.set(email, {
      fullName,
      email,
      phone,
      password: hashedPassword,
      otp,
      expiresAt,
      attempts: 0,
      lastSentAt: now,
    });

    return res.status(200).json({
      message: 'OTP sent to your mobile number. Verify to complete signup.',
      maskedPhone: maskPhoneNumber(phone),
      expiresInSeconds: Math.floor(OTP_EXPIRY_MS / 1000),
      ...(isProduction() || !otpDispatch.devOtp ? {} : { devOtp: otpDispatch.devOtp }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error creating user' });
  }
});

router.post('/signup/resend-otp', async (req, res) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Enter a valid email' });
    }

    const pending = pendingSignups.get(email);
    if (!pending) {
      return res.status(400).json({ message: 'No pending signup found for this email' });
    }

    const now = Date.now();
    if (now - pending.lastSentAt < OTP_RESEND_COOLDOWN_MS) {
      return res.status(429).json({
        message: `Please wait ${getRetryAfterSeconds(pending.lastSentAt)}s before requesting another OTP`,
      });
    }

    const otp = hasTwilioVerifyConfig() ? null : generateOtp();
    const otpDispatch = await dispatchSignupOtp(pending.phone, otp);

    pending.otp = otp;
    pending.expiresAt = now + OTP_EXPIRY_MS;
    pending.attempts = 0;
    pending.lastSentAt = now;
    pendingSignups.set(email, pending);

    return res.status(200).json({
      message: 'A new OTP has been sent.',
      maskedPhone: maskPhoneNumber(pending.phone),
      expiresInSeconds: Math.floor(OTP_EXPIRY_MS / 1000),
      ...(isProduction() || !otpDispatch.devOtp ? {} : { devOtp: otpDispatch.devOtp }),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to resend OTP' });
  }
});

router.post('/signup/verify-otp', async (req, res) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const otp = String(req.body?.otp || '').trim();

    if (!email || !otp) {
      return res.status(400).json({ message: 'email and otp are required' });
    }

    const pending = pendingSignups.get(email);
    if (!pending) {
      return res.status(400).json({ message: 'No pending signup found for this email' });
    }

    if (Date.now() > pending.expiresAt) {
      pendingSignups.delete(email);
      return res.status(400).json({ message: 'OTP expired. Please signup again.' });
    }

    if (pending.attempts >= MAX_OTP_ATTEMPTS) {
      pendingSignups.delete(email);
      return res.status(429).json({ message: 'Too many invalid OTP attempts. Please signup again.' });
    }

    const isOtpValid = await validateSignupOtp(pending.phone, otp, pending.otp);
    if (!isOtpValid) {
      pending.attempts += 1;
      pendingSignups.set(email, pending);
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const existingUser = users.find((u) => u.email === pending.email || u.phone === pending.phone);
    if (existingUser) {
      pendingSignups.delete(email);
      return res.status(400).json({ message: 'User already exists' });
    }

    users.push({
      fullName: pending.fullName,
      email: pending.email,
      phone: pending.phone,
      password: pending.password,
    });
    persistUsers(users);

    pendingSignups.delete(email);

    return res.status(201).json({ message: 'Account verified and created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to verify OTP' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = users.find(u => u.email === normalizedEmail);

    if (!user) {
      if (pendingSignups.has(normalizedEmail)) {
        return res.status(403).json({ message: 'Please verify mobile OTP before logging in' });
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: user.email }, 
      process.env.JWT_SECRET || 'your_jwt_secret', 
      { expiresIn: '24h' }
    );
    
    res.json({ token, fullName: user.fullName });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;
