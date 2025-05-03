import React from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
 // ✅ Changed to ultralogo.png to avoid clash
import { Menu, X, User } from 'lucide-react';
import ultraLogo from '../assets/ULTRA+.png';
import proLogo from '../assets/ULTRA PRO+.png';
import scalptrLogo from '../assets/SCALPR.png';
import snpyerLogo from '../assets/SNYPER.png';

export default function Navbar() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'admin' | 'user' | ''>('');
  const [botMenuOpen, setBotMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = role === 'admin';

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/dashboard`, { credentials: 'include' })
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => {
        setUsername(data.username || '');
        setRole(data.role || '');
      })
      .catch(() => {
        setUsername('');
        setRole('');
      });
  }, []);

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUsername('');
    setRole('');
    navigate('/login');
  };

  const navLink = (path: string, label: string) => (
    <Link
      to={path}
      onClick={() => setMobileOpen(false)}
      className={`hover:text-[var(--accent)] transition duration-200 focus:outline-none ${
        location.pathname === path ? 'text-red-500 font-semibold' : ''
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="bg-black text-white px-4 py-3 border-b border-zinc-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3">

        <Link
  to="/?page=home"
  className="font-bold text-lg text-red-500 hover:text-white tracking-wide pr-4"
>
  ULTRA
</Link>

        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {navLink('/about', 'About')}
          {navLink('/charts', 'Charts')}
          {navLink('/dashboard', 'Dashboard')}
          <div className="relative">
            <button
              onClick={() => setBotMenuOpen(!botMenuOpen)}
              className="px-3 py-1 border border-red-500 rounded hover:bg-red-900/30 transition"
            >
              Bots ▼
            </button>
            {botMenuOpen && (
              <div className="absolute top-10 left-0 bg-black border border-red-600 shadow-xl rounded p-4 w-64 space-y-3 z-50">
                <Link to="/bots/ultra" className="flex items-center gap-3 hover:text-red-400" onClick={() => setBotMenuOpen(false)}>
                  <img src={ultraLogo} className="h-6 w-6" alt="ULTRA+" /> ULTRA+
                </Link>
                <Link to="/bots/pro" className="flex items-center gap-3 hover:text-red-400" onClick={() => setBotMenuOpen(false)}>
                  <img src={proLogo} className="h-6 w-6" alt="PRO+" /> PRO+
                </Link>
                <Link to="/bots/scalptr" className="flex items-center gap-3 hover:text-red-400" onClick={() => setBotMenuOpen(false)}>
                  <img src={scalptrLogo} className="h-6 w-6" alt="SCALPTR" /> SCALPTR
                </Link>
                <Link to="/bots/snpyer" className="flex items-center gap-3 hover:text-red-400" onClick={() => setBotMenuOpen(false)}>
                  <img src={snpyerLogo} className="h-6 w-6" alt="SNYPER" /> SNYPER
                </Link>
              </div>
            )}
          </div>
          {navLink('/privacy', 'Privacy')}
          {navLink('/faq', 'FAQ')}
          {navLink('/vision', 'Vision')}
          {isAdmin && (
            <>
              {navLink('/admin', 'Admin')}
              {navLink('/admin/settings', 'Settings')}
              {navLink('/admin/signals', 'Signals Log')}
            </>
          )}
          {username ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="px-3 py-1 border border-red-500 rounded flex items-center gap-2 hover:bg-red-800/40"
              >
                <User size={16} />
                <span>{username}</span>
              </button>
              {userMenuOpen && (
                <div className="absolute top-10 right-0 w-40 bg-black border border-red-400 rounded shadow-lg p-2 text-sm z-50">
                  <button onClick={logout} className="w-full text-left px-3 py-2 hover:bg-red-900 rounded">
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            navLink('/login', 'Login')
          )}
        </nav>

        {/* Mobile Icon */}
        <div className="lg:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-lg fixed top-0 left-0 w-full h-full px-6 py-10 z-40 flex flex-col gap-4 text-lg text-white">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded"
          >
            X
          </button>
          {navLink('/', 'Home')}
          {navLink('/about', 'About')}
          {navLink('/charts', 'Charts')}
          {navLink('/dashboard', 'Dashboard')}
          {navLink('/bots/ultra', 'ULTRA+')}
          {navLink('/bots/pro', 'PRO+')}
          {navLink('/bots/scalptr', 'SCALPTR')}
          {navLink('/bots/snpyer', 'SNYPER')}
          {navLink('/privacy', 'Privacy')}
          {navLink('/faq', 'FAQ')}
          {navLink('/vision', 'Vision')}
          {isAdmin && (
            <>
              {navLink('/admin', 'Admin')}
              {navLink('/admin/settings', 'Settings')}
              {navLink('/admin/signals', 'Signals Log')}
            </>
          )}
          {username ? (
            <button onClick={logout} className="text-red-500 underline text-left mt-4">
              Log out
            </button>
          ) : (
            navLink('/login', 'Login')
          )}
        </div>
      )}
    </header>
  );
}
