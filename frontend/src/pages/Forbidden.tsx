// src/pages/Forbidden.tsx
import { Link } from "react-router-dom";
import React from "react";

export default function Forbidden() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-6">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-red-600 mb-4">403</h1>
        <p className="text-2xl font-bold mb-2">Access Denied</p>
        <p className="text-zinc-400 mb-6">You don’t have permission to access this section.</p>

        <Link
          to="/"
          className="inline-block mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition"
        >
          🔙 Return Home
        </Link>
      </div>
    </div>
  );
}
