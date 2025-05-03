app.get('/api/signals/log', authMiddleware, requireRole('admin'), async (req, res) => {
  try {
    const count = await Signal.countDocuments();
    const recent = await Signal.find({}, { __v: 0 })
      .sort({ timestamp: -1 })
      .limit(5);

    res.json({ total: count, recent });
  } catch (err) {
    res.status(500).json({ error: 'Log fetch failed' });
  }
});
