// src/components/AdminSidebar.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden flex items-center p-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-zinc-900 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block w-64 p-6`}>
        <div className="text-white text-2xl font-bold flex items-center gap-2 mb-8">
          <span>🛠️</span> <span>Admin</span>
        </div>

        <nav className="flex flex-col gap-4">
          <Link
            to="/admin/dashboard"
            className={`px-4 py-2 rounded ${isActive('/admin/dashboard') ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}
            onClick={closeSidebar}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/settings"
            className={`px-4 py-2 rounded ${isActive('/admin/settings') ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}
            onClick={closeSidebar}
          >
            Settings
          </Link>
          <Link
            to="/admin/signals"
            className={`px-4 py-2 rounded ${isActive('/admin/signals') ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}
            onClick={closeSidebar}
          >
            Signals
          </Link>
          <Link
            to="/admin/assistant"
            className={`px-4 py-2 rounded ${isActive('/admin/assistant') ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white'}`}
            onClick={closeSidebar}
          >
            Assistant
          </Link>
        </nav>
      </div>
    </>
  );
}
