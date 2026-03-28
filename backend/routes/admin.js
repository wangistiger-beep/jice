const express = require('express');
const store = require('../data/store');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { auditMiddleware } = require('../middleware/audit');

const router = express.Router();

router.use(authenticateToken, requireAdmin);

router.get('/users/pending', (req, res) => {
  const users = store.getUsers().filter(u => u.status === 'pending').map(u => ({
    id: u.id,
    username: u.username,
    email: u.email,
    createdAt: u.createdAt
  }));
  res.json(users);
});

router.get('/users', (req, res) => {
  const users = store.getUsers().map(u => ({
    id: u.id,
    username: u.username,
    email: u.email,
    role: u.role,
    status: u.status,
    createdAt: u.createdAt
  }));
  res.json(users);
});

router.put(
  '/users/:id/approve',
  auditMiddleware('APPROVE_USER', 'user'),
  (req, res) => {
    const userId = Number(req.params.id);
    const user = store.updateUser(userId, { status: 'approved' });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User approved successfully' });
  }
);

router.put(
  '/users/:id/reject',
  auditMiddleware('REJECT_USER', 'user'),
  (req, res) => {
    const userId = Number(req.params.id);
    const user = store.updateUser(userId, { status: 'rejected' });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User rejected successfully' });
  }
);

router.get('/cases/pending', (req, res) => {
  const cases = store.getPendingCases().map(c => {
    const author = store.getUserById(c.authorId);
    return {
      ...c,
      authorName: author ? author.username : null
    };
  });
  res.json(cases);
});

router.put(
  '/cases/:id/approve',
  auditMiddleware('APPROVE_CASE', 'case'),
  (req, res) => {
    const caseId = Number(req.params.id);
    const { reviewNotes } = req.body;
    const updatedCase = store.updateCase(caseId, {
      status: 'published',
      reviewerId: req.user.id,
      reviewNotes,
      reviewedAt: new Date().toISOString()
    });
    
    if (!updatedCase) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.json({ message: 'Case approved and published' });
  }
);

router.put(
  '/cases/:id/reject',
  auditMiddleware('REJECT_CASE', 'case'),
  (req, res) => {
    const caseId = Number(req.params.id);
    const { reviewNotes } = req.body;
    const updatedCase = store.updateCase(caseId, {
      status: 'rejected',
      reviewerId: req.user.id,
      reviewNotes,
      reviewedAt: new Date().toISOString()
    });
    
    if (!updatedCase) {
      return res.status(404).json({ error: 'Case not found' });
    }
    res.json({ message: 'Case rejected' });
  }
);

router.put(
  '/cases/:id/return-to-pending',
  auditMiddleware('RETURN_CASE_TO_PENDING', 'case'),
  (req, res) => {
    const caseId = Number(req.params.id);
    const { reviewNotes } = req.body;
    const caseData = store.getCaseById(caseId);
    
    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }
    
    if (caseData.status !== 'published') {
      return res.status(400).json({ error: 'Only published cases can be returned to pending' });
    }
    
    const updatedCase = store.updateCase(caseId, {
      status: 'pending',
      reviewerId: req.user.id,
      reviewNotes: reviewNotes || '管理员退回待审核',
      reviewedAt: new Date().toISOString()
    });
    
    res.json({ message: 'Case returned to pending successfully' });
  }
);

router.delete(
  '/cases/:id',
  auditMiddleware('DELETE_CASE', 'case'),
  (req, res) => {
    const caseId = Number(req.params.id);
    const caseData = store.getCaseById(caseId);
    
    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }
    
    const deleted = store.deleteCase(caseId);
    if (deleted) {
      res.json({ message: 'Case deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete case' });
    }
  }
);

router.put(
  '/cases/:id/recommend',
  auditMiddleware('RECOMMEND_CASE', 'case'),
  (req, res) => {
    const caseId = Number(req.params.id);
    const caseData = store.getCaseById(caseId);
    
    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }
    
    const allCases = store.getCases();
    const currentRecommendedCases = allCases.filter(c => c.isRecommended && c.id !== caseId);
    
    if (currentRecommendedCases.length >= 3) {
      const oldestRecommended = currentRecommendedCases
        .filter(c => c.recommendedAt)
        .sort((a, b) => new Date(a.recommendedAt) - new Date(b.recommendedAt))[0];
      
      if (oldestRecommended) {
        store.updateCase(oldestRecommended.id, {
          isRecommended: false,
          recommendedAt: null,
          recommendedBy: null
        });
      }
    }
    
    const updatedCase = store.updateCase(caseId, {
      isRecommended: true,
      recommendedAt: new Date().toISOString(),
      recommendedBy: req.user.id
    });
    
    res.json({ message: 'Case recommended successfully', case: updatedCase });
  }
);

router.put(
  '/cases/:id/unrecommend',
  auditMiddleware('UNRECOMMEND_CASE', 'case'),
  (req, res) => {
    const caseId = Number(req.params.id);
    const caseData = store.getCaseById(caseId);
    
    if (!caseData) {
      return res.status(404).json({ error: 'Case not found' });
    }
    
    const updatedCase = store.updateCase(caseId, {
      isRecommended: false,
      recommendedAt: null,
      recommendedBy: null
    });
    
    res.json({ message: 'Case unrecommended successfully', case: updatedCase });
  }
);

router.get('/statistics', (req, res) => {
  res.json(store.getStatistics());
});

router.get('/audit-logs', (req, res) => {
  const logs = store.getAuditLogs(100).map(log => {
    const user = log.userId ? store.getUserById(log.userId) : null;
    return {
      ...log,
      username: user ? user.username : null
    };
  });
  res.json(logs);
});

module.exports = router;
