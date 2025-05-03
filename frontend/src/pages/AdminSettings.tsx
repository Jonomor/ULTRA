// src/pages/AdminSettings.tsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from "react";
export default function AdminSettings() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL;
  
    fetch(`${API}/dashboard`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        // ...your logic
      });
  }, []);
  
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        if (data.role !== 'admin') {
          navigate('/403');
        } else {
          setAuthorized(true);
        }
      })
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center text-white mt-20 text-lg">
        Validating admin access...
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-100">
      <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">⚙️ Admin Settings</h1>
      <p className="mb-4 text-lg text-zinc-300">This section allows admin-level configuration and control.</p>
      <p className="text-gray-500 italic">Features like audit trails, signal review, and strategy overrides coming soon.</p>
    </div>
  );
}
