const store = require('../data/store');

const logAudit = (user, action, entityType, entityId, details, ip) => {
  try {
    store.addAuditLog({
      userId: user ? user.id : null,
      action,
      entityType,
      entityId,
      details: JSON.stringify(details),
      ipAddress: ip
    });
  } catch (err) {
    console.error('Audit log error:', err);
  }
};

const auditMiddleware = (action, entityType) => {
  return (req, res, next) => {
    const originalSend = res.send;
    const ip = req.ip || req.connection.remoteAddress;
    
    res.send = function(data) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        logAudit(
          req.user,
          action,
          entityType,
          req.params.id || req.body.id,
          { body: req.body, params: req.params },
          ip
        );
      }
      originalSend.call(this, data);
    };
    
    next();
  };
};

module.exports = { auditMiddleware, logAudit };
