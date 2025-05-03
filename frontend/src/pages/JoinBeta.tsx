// src/pages/JoinBeta.tsx
import React from "react";
import { useState } from 'react';

export default function JoinBeta() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send to MailerLite, Tally, Airtable, etc.
    console.log('📧 Email submitted:', email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-red-500">🚀 Join the ULTRA SYSTEM Beta</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="px-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-400 w-80"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-full font-bold"
          >
            Request Early Access
          </button>
        </form>
      ) : (
        <p className="text-green-400 text-lg">✅ Thank you! We'll notify you soon.</p>
      )}
    </div>
  );
}
