const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { auditMiddleware } = require('../middleware/audit');

router.get('/', (req, res) => {
  res.json(store.getTags());
});

router.get('/search', (req, res) => {
  const { q } = req.query;
  res.json(store.searchTags(q));
});

router.get('/:id', (req, res) => {
  const tag = store.getTagById(Number(req.params.id));
  if (!tag) {
    return res.status(404).json({ error: 'Tag not found' });
  }
  res.json(tag);
});

router.post(
  '/',
  authenticateToken,
  requireAdmin,
  auditMiddleware('CREATE_TAG', 'tag'),
  (req, res) => {
    const { name, description } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Tag name is required' });
    }
    
    const tag = store.createTag({ name, description });
    res.status(201).json(tag);
  }
);

router.put(
  '/:id',
  authenticateToken,
  requireAdmin,
  auditMiddleware('UPDATE_TAG', 'tag'),
  (req, res) => {
    const tag = store.updateTag(Number(req.params.id), req.body);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json(tag);
  }
);

router.delete(
  '/:id',
  authenticateToken,
  requireAdmin,
  auditMiddleware('DELETE_TAG', 'tag'),
  (req, res) => {
    const deleted = store.deleteTag(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json({ message: 'Tag deleted successfully' });
  }
);

module.exports = router;
