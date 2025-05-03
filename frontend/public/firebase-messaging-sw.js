// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDk3J1Ulb-g5XeGi82qdbLw_2-lCjZKrD8",
  projectId: "ultra-plus-d5d92",
  messagingSenderId: "10836291606570657",
  appId: "1:1083629160657:web:09987799e3910bfcb0ddf0",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/favicon.ico',
  });
});
