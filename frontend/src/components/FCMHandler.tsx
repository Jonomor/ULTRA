// src/components/FCMHandler.tsx
import { useEffect } from 'react';
import { getFcmToken, setupOnMessage } from '../lib/firebase';

export default function FCMHandler() {
  useEffect(() => {
    getFcmToken().then((token) => {
      if (token) {
        fetch('/api/fcm-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
      }
    });

    setupOnMessage((payload) => {
      alert(`📡 New alert: ${payload.notification?.title}\n${payload.notification?.body}`);
    });
  }, []);

  return null;
}
