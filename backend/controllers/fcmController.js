import admin from 'firebase-admin';

// Optional: store tokens in memory (or move to DB later)
global.fcmTokens = global.fcmTokens || [];

// ✅ POST /api/fcm-token
export const registerToken = (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(400).json({ error: 'Missing token' });

  if (!global.fcmTokens.includes(token)) {
    global.fcmTokens.push(token);
    console.log('🔐 FCM token registered:', token.slice(0, 10) + '...');
  }

  res.json({ success: true });
};

// ✅ POST /api/fcm-send
export const sendNotification = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Missing title or body' });
  }

  if (!global.fcmTokens.length) {
    return res.status(400).json({ error: 'No tokens registered' });
  }

  const message = {
    notification: { title, body },
    tokens: global.fcmTokens,
  };

  try {
    const result = await admin.messaging().sendMulticast(message);
    console.log('📣 FCM sent to', result.successCount, 'devices');
    res.json({ success: true, result });
  } catch (err) {
    console.error('❌ FCM error:', err);
    res.status(500).json({ error: 'Failed to send notification' });
  }
};
