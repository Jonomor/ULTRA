// src/components/Layout.tsx
import { ReactNode } from 'react';
import React from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">

      <main className="flex-1 relative">
        {children}
      </main>
      <footer className="text-center text-sm text-gray-500 py-4 border-t bg-black">
        &copy; {new Date().getFullYear()} Jonomor — Debug Footer
      </footer>
    </div>
  );
}
