// src/pages/admin/dashboard.tsx
import AdminSidebar from "../../components/AdminSidebar";
import AdminRouteGuard from "../../components/AdminRouteGuard";
import React from "react";

export default function AdminDashboard() {
  return (
    <AdminRouteGuard>
      <div className="flex flex-col lg:flex-row">
        <AdminSidebar />
        <div className="flex-1 p-6">
          <h1 className="text-4xl font-bold text-red-500 mb-8">🛡️ Admin Dashboard</h1>

          {/* Your dashboard content goes here */}
          <p className="text-gray-300">Welcome to the admin control panel.</p>
        </div>
      </div>
    </AdminRouteGuard>
  );
}
