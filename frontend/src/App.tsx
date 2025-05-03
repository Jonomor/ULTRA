import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getFcmToken, setupOnMessage } from "./lib/firebase";

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
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
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
      } else {
        console.warn("Notification permission denied");
      }
    });
  }, []);

  if (!redirect) return <div className="text-white p-8">Loading...</div>;

  return <Navigate to={redirect} />;
}
