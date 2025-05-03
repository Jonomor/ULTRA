import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import React from "react";
interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const isAuthenticated = document.cookie.includes('token=');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
