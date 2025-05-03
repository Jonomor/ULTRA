import { useEffect } from "react";
import { getFcmToken, setupOnMessage } from "./lib/firebase";

function App() {
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

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#111",
      color: "#0ff",
      fontSize: "2rem",
      fontFamily: "sans-serif",
    }}>
      🚀 ULTRA SYSTEM DEPLOYED
    </div>
  );
}

export default App;
