// src/pages/privacy.tsx
import React from "react";

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-400">Last updated: April 12, 2025</p>

      <p className="mb-6 text-zinc-300">
        This Privacy Policy outlines how we collect, use, and safeguard your information across ULTRA+ and ULTRA PRO+ by Jonomor.
        We take privacy seriously — because we use this system too.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">🔍 Information We Collect</h2>
      <ul className="list-disc list-inside text-zinc-400 mb-6">
        <li>Basic browser and device metadata (for security and diagnostics)</li>
        <li>Anonymous analytics events (page views, system usage)</li>
        <li>Push notification tokens (used only for real-time alerts)</li>
        <li>Account login info (username and encrypted credentials)</li>
        <li>Signal logs tied to session (admin or operator actions)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">🍪 Use of Cookies</h2>
      <p className="mb-6 text-zinc-400">
        We use cookies to:
        <ul className="list-disc list-inside ml-6">
          <li>Maintain your session while logged in</li>
          <li>Support analytics and bot performance insights</li>
          <li>Enhance user experience across the dashboard</li>
        </ul>
        Cookies are never used for advertising or third-party tracking.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">🔐 Security & Protections</h2>
      <p className="mb-6 text-zinc-400">
        All API and database operations are protected via token-based authentication and HTTPS encryption.
        Sensitive operations like dispatch control and overrides are admin-only.
        Logs are monitored for unusual behavior, and admin audit trails are enforced.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">🎛️ Your Rights & Controls</h2>
      <p className="mb-6 text-zinc-400">
        You can clear cookies, disable push alerts, or revoke permissions at any time. If you’re an admin and would like to delete your account or audit log data, email us directly.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-white">📬 Contact Us</h2>
      <p className="mb-4 text-zinc-400">
        Have questions or security concerns? We’re transparent. Reach out at&nbsp;
        <a
          href="mailto:support@jonomor.com"
          className="underline text-blue-500 hover:text-blue-400"
        >
          support@jonomor.com
        </a>
        .
      </p>

      <p className="text-xs text-zinc-600 italic">
        ULTRA+ and ULTRA PRO+ are internal-use tactical systems. By logging in, you agree to the terms outlined here.
      </p>
    </div>
  );
}
