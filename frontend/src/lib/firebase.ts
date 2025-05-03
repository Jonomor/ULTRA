// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';

// 🔐 Firebase Config — pulled from .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// ✅ Initialize Firebase + Messaging
const app = initializeApp(firebaseConfig);
const messaging: Messaging = getMessaging(app);

// ✅ Securely get VAPID key from .env
const vapidKey = import.meta.env.VITE_VAPID_KEY;

// ✅ Request FCM Token
export const getFcmToken = async (): Promise<string | null> => {
  try {
    const token = await getToken(messaging, { vapidKey });
    return token;
  } catch (err) {
    console.error('❌ FCM token error:', err);
    return null;
  }
};

// ✅ Handle Foreground Messages
export const setupOnMessage = (callback: (payload: any) => void) => {
  onMessage(messaging, (payload) => {
    console.log('🔔 FCM received (foreground):', payload);
    callback(payload);
  });
};
