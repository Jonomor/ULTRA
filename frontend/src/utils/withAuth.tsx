// src/utils/withAuth.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function withAuth<T extends object>(
  Component: React.ComponentType<T>
) {
  return function WrappedComponent(props: T) {
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      fetch("http://localhost:4000/api/dashboard", {
        credentials: "include", // ✅ use cookies
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Not authorized");
        })
        .then(() => {
          setAuthorized(true);
        })
        .catch(() => {
          navigate("/login");
        })
        .finally(() => setChecking(false));
    }, [navigate]);

    // ✅ Loading state during auth check
    if (checking) {
      return (
        <p className="text-center mt-20 text-white">
          Checking auth...
        </p>
      );
    }

    return authorized ? <Component {...props} /> : null;
  };
}
