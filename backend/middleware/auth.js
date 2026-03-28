const jwt = require('jsonwebtoken');
const store = require('../data/store');

const JWT_SECRET = process.env.JWT_SECRET;
if (process.env.NODE_ENV === 'production' && !JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in production');
}

const effectiveJwtSecret = JWT_SECRET || 'dev-secret';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, effectiveJwtSecret);
    const dbUser = store.getUserById(decoded.id);
    
    if (!dbUser) {
      return res.sendStatus(404);
    }
    if (dbUser.status !== 'approved') {
      return res.status(403).json({ error: 'Account not approved' });
    }
    req.user = dbUser;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.sendStatus(403);
  }
  next();
};

module.exports = {
  authenticateToken,
  requireAdmin,
  JWT_SECRET: effectiveJwtSecret
};
