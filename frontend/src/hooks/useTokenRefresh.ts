import { useEffect } from 'react';

export const useTokenRefresh = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:4000/api/refresh', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      } catch (err) {
        console.error('🔄 Token refresh failed');
        localStorage.clear();
        window.location.href = '/login';
      }
    }, 5 * 60 * 1000); // every 5 minutes

    return () => clearInterval(interval);
  }, []);
};
