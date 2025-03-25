// src/pages/Register.js
import React, { useState } from 'react';
import { registerUser } from '../utils/AdminApi';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(userName, password);
      setMessage(`Registration successful: ${response.message}`);
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800" style={{background:'#13e1e51f'}}>
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md" style={{ background: "linear-gradient(135deg, #0f0c29, #0B0620, #13e1e51f)" }}   >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            required
            className="w-full p-3 mb-4 bg-gray-700 rounded text-white placeholder-gray-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 mb-4 bg-gray-700 rounded text-white placeholder-gray-400"
          />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-bold">
            Register
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
