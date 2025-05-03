export default function PushTestButton() {
    const sendTest = async () => {
      const res = await fetch("http://localhost:5173/api/admin/test-signal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your_admin_token",
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
  