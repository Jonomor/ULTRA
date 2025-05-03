import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getFcmToken, setupOnMessage } from "./lib/firebase";

export default function App() {
  const [redirect, setRedirect] = useState<string | null>(null);

  const BACKEND_URL =
    import.meta.env.PROD
      ? import.meta.env.VITE_BACKEND_URL // Production: use .env variable set in Vercel
      : "http://localhost:4000";         // Local dev: use localhost

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/dashboard`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.role === "admin") setRedirect("/admin");
        else setRedirect("/dashboard");
      })
      .catch(() => setRedirect("/login"));
  }, [BACKEND_URL]);

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getFcmToken().then((token) => {
          if (token) {
            fetch(`${BACKEND_URL}/api/fcm-token`, {
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
      } else {
        console.warn("Notification permission denied");
      }
    });
  }, [BACKEND_URL]);

  if (!redirect) return <div className="text-white p-8">Loading...</div>;

  return <Navigate to={redirect} />;
}
