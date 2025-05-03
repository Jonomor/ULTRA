import React from "react";


const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/test-signal`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ADMIN_TOKEN}`,
  },
  body: JSON.stringify({
    message: "📢 Manual broadcast: Check system visibility!",
  }),
});


      if (res.ok) {
        alert("📡 Test Signal Broadcasted");
      } else {
        alert("❌ Failed to send signal");
      }
    };

    return (
      <button
        onClick={sendTest}
        className="mt-6 px-6 py-3 bg-crimson text-white rounded-xl hover:bg-red-700 transition"
      >
        📤 Broadcast Test Signal
      </button>
    );
  }
  