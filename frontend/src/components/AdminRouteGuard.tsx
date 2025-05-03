// src/components/AdminRouteGuard.tsx
import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ADMIN_SECRET}`,
            'Content-Type': 'application/json',
          },
        });

        if (res.status === 403) {
          console.warn('Redirecting to /403 forbidden');
          navigate('/403');
          return;
        }

        if (!res.ok) {
          console.warn('Redirecting to /login (unauthorized)');
          navigate('/login');
          return;
        }

        const data = await res.json();
        if (data.role !== 'admin') {
          console.warn('Redirecting non-admin to /dashboard');
          navigate('/dashboard');
        } else {
          setAuthorized(true);
        }
      } catch (err) {
        console.error('Verification fetch error:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    verifyAccess();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
