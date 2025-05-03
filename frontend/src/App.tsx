import { useEffect, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { getFcmToken, setupOnMessage } from "./lib/firebase";

import Dashboard from "./pages/dashboard";
import Admin from "./pages/admin";
import Login from "./pages/login";
import LandingPage from "./pages/marketing/LandingPage";

export default function App() {
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/dashboard', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.role === "admin") setRedirect("/admin");
        else setRedirect("/dashboard");
      })
      .catch(() => setRedirect("/login"));
  }, []);

  useEffect(() => {
    getFcmToken().then((token) => {
      if (token) {
        fetch("/api/fcm-token", {
          method: "POST",
          body: JSON.stringify({ token }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
      }
    });

    setupOnMessage((payload) => {
      console.log("FCM Message received:", payload);
    });
  }, []);

  if (!redirect) return <div className="text-white p-8">Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to={redirect} />} />
    </Routes>
  );
}
