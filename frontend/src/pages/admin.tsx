// src/pages/admin.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Loading...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/dashboard', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        if (data.role !== 'admin') {
          navigate('/403');
          return;
        }
        setMessage(`👑 Admin access granted, ${data.username}`);
      })
      .catch(err => {
        console.error('Auth error:', err);
        navigate('/login');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center text-white mt-20 text-lg">
        Verifying admin access...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-100">
      <h1 className="text-4xl font-extrabold text-red-500 mb-4">ULTRA+ Admin Panel</h1>
      <p className="mb-4">{message}</p>
      <p className="text-gray-500 italic">Only visible to admins.</p>
    </div>
  );
}
