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
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}
