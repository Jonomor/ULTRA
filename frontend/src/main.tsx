import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import App from './App.tsx';
import About from './pages/about.tsx';
import Admin from './pages/admin.tsx';
import AdminSettings from './pages/admin/SettingsPage.tsx'; // ✅ this is the real file
import AdminSignals from './pages/admin/signals.tsx';
import Dashboard from './pages/dashboard.tsx';
import ChartsPage from './pages/charts/charts';

import FAQPage from './pages/faq.tsx';
import Forbidden from './pages/Forbidden.tsx';
import Layout from './components/layout.tsx';
import Login from './pages/login.tsx';
import Privacy from './pages/privacy.tsx';

import './ultra-theme.css';
import './app.css';
import './index.css';

import { useEffect } from 'react';
import { pageview } from './lib/ga';
import { useTokenRefresh } from './hooks/useTokenRefresh';

function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);
  return null;
}

const gaId = import.meta.env.VITE_GA_ID;

if (gaId) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);
}


function AppWrapper() {
  useTokenRefresh();

  return (
    <BrowserRouter>
      <RouteTracker />
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/signals" element={<AdminSignals />} />
          <Route path="/403" element={<Forbidden />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

