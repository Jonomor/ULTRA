import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // ✅ Add framer-motion

// ✅ Tell TypeScript about window.ml
declare global {
  interface Window {
    ml: any;
  }
}

export default function EarlyAccess() {
  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.mailerlite.com/js/universal.js";
    script.async = true;
    script.onload = () => {
      window.ml = window.ml || function () {
        (window.ml.q = window.ml.q || []).push(arguments);
      };
      window.ml('account', '1455664');
      setTimeout(() => setFormLoaded(true), 1000); // ✅ Delay for smoother fade
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6 py-20">
      <h1 className="text-4xl font-extrabold text-red-500 mb-6 uppercase tracking-widest">
        Secure Early Access
      </h1>

      <p className="text-gray-400 mb-8 max-w-xl">
        Be the first to access SCALPTR, SNYPER, and other secret releases.
      </p>

      {/* Fade-in MailerLite form */}
      {formLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full flex justify-center"
          id="mlb2-1234567"
        />
      )}
    </div>
  );
}
