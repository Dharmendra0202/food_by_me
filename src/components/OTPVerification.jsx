import React, { useState } from 'react';

export default function OTPVerification() {
  const [otp, setOtp] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    // Placeholder for OTP verification logic
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>OTP Verification</h3>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}
