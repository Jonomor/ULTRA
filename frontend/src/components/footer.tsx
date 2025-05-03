// src/components/Footer.tsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100/30 text-center text-sm text-gray-600 py-4 mt-10">
      <p>&copy; {new Date().getFullYear()} ULTRA Jonomor. All rights reserved.</p>
      <Link to="/privacy" className="underline ml-2">Privacy Policy</Link>
    </footer>
  );
}
