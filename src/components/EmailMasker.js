import React, { useState, useEffect } from 'react';
import { getApi } from '../services/api';

const EmailMasker = ({ tenant }) => {
  const [email, setEmail] = useState('');
  const [masked, setMasked] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setMasked('');
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [masked, error]);

  const handleMask = async () => {
  setError('');
  setMasked('');

  if (!email) {
    setError('Please enter an email address.');
    return;
  }

  try {
    const api = getApi(tenant);

    const response = await api.get(`/mask-email?email=${encodeURIComponent(email)}&tenant=${tenant}`);

    setMasked(response.data.masked);
    setEmail(''); 
  } catch (err) {
    console.error('Masking error:', err);
    setError('Failed to mask email. Make sure the format is correct.');
  }
};


  return (
    <div>
      <h3>🔐 Email Masking Utility</h3>

      <div className="input-group mb-3 mt-4" >
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={handleMask}>Mask</button>
      </div>

      {masked && (
        <div
          className="alert alert-success"
          style={{ padding: '8px 12px', fontSize: '14px' }}
        >
          <strong>Masked Email:</strong> {masked}
        </div>
      )}

      {error && (
        <div
          className="alert alert-danger"
          style={{ padding: '8px 12px', fontSize: '14px', maxWidth: '400px' }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default EmailMasker;
