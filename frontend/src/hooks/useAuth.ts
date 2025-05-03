// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null); // ✅ ADD THIS

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('username');

    setIsAuthenticated(!!token);
    setUsername(name);
    setToken(token); // ✅ ADD THIS
  }, []);

  const login = (username: string) => {
    const demoToken = 'demo-token';
    localStorage.setItem('token', demoToken);
    localStorage.setItem('username', username);
    setIsAuthenticated(true);
    setUsername(username);
    setToken(demoToken); // ✅ ADD THIS
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUsername(null);
    setToken(null); // ✅ ADD THIS
    window.location.href = '/';
  };

  return { isAuthenticated, username, token, login, logout }; // ✅ RETURN token
}
