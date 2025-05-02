export function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1];
    const adminKey = process.env.ADMIN_SECRET;

    if (!token || token !== adminKey) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  } catch (err) {
    console.error('🔒 Admin check failed:', err);
    return res.status(500).json({ error: 'Internal auth error' });
  }
}
