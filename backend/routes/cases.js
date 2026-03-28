const express = require('express');
const { body, validationResult } = require('express-validator');
const store = require('../data/store');
const { authenticateToken } = require('../middleware/auth');
const { auditLog } = require('../middleware/audit');

const router = express.Router();

// 获取已发布的案例列表（公开）
router.get('/', (req, res) => {
  const cases = store.getPublishedCases().map(c => {
    const author = store.getUserById(c.authorId);
    return {
      ...c,
      authorName: author ? author.username : null
    };
  });
  res.json(cases);
});

// 获取用户自己的案例提交（需要认证）
router.get('/my/submissions', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const cases = store.getCasesByAuthor(userId);
  res.json(cases);
});

// 获取单个案例详情（公开）
router.get('/:id', (req, res) => {
  const caseId = Number(req.params.id);
  const caseData = store.getCaseById(caseId);
  
  if (!caseData) {
    return res.status(404).json({ error: 'Case not found' });
  }
  
  const author = store.getUserById(caseData.authorId);
  res.json({
    ...caseData,
    authorName: author ? author.username : null
  });
});

// 创建新案例（需要认证）
router.post('/', authenticateToken, [
  body('title').notEmpty().withMessage('标题不能为空'),
  body('category').notEmpty().withMessage('分类不能为空')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const caseData = {
    ...req.body,
    authorId: req.user.id,
    status: 'draft'
  };
  
  const newCase = store.createCase(caseData);
  res.status(201).json(newCase);
});

// 更新案例详情（需要认证）
router.put('/:id/details', authenticateToken, (req, res) => {
  const caseId = Number(req.params.id);
  const caseData = store.getCaseById(caseId);
  
  if (!caseData || caseData.authorId !== req.user.id) {
    return res.status(404).json({ error: 'Case not found or not authorized' });
  }
  
  const detailsData = req.body;
  const existingDetails = store.getCaseDetails(caseId);
  
  if (existingDetails) {
    store.updateCaseDetails(caseId, detailsData);
  } else {
    store.createCaseDetails(caseId, detailsData);
  }
  
  res.json({ message: 'Case details updated successfully' });
});

// 提交案例审核（需要认证）
router.put('/:id/submit', authenticateToken, (req, res) => {
  const caseId = Number(req.params.id);
  const caseData = store.getCaseById(caseId);
  
  if (!caseData || caseData.authorId !== req.user.id) {
    return res.status(404).json({ error: 'Case not found or not authorized' });
  }
  
  store.updateCase(caseId, { status: 'pending' });
  res.json({ message: 'Case submitted for review' });
});

// 更新案例（需要认证）
router.put('/:id', authenticateToken, (req, res) => {
  const caseId = Number(req.params.id);
  const caseData = store.getCaseById(caseId);
  
  if (!caseData || caseData.authorId !== req.user.id) {
    return res.status(404).json({ error: 'Case not found or not authorized' });
  }
  
  const updates = req.body;
  store.updateCase(caseId, updates);
  res.json({ message: 'Case updated successfully' });
});

// 删除案例（需要认证）
router.delete('/:id', authenticateToken, (req, res) => {
  const caseId = Number(req.params.id);
  const caseData = store.getCaseById(caseId);
  
  if (!caseData || caseData.authorId !== req.user.id) {
    return res.status(404).json({ error: 'Case not found or not authorized' });
  }
  
  if (caseData.status === 'published') {
    return res.status(400).json({ error: 'Cannot delete published case' });
  }
  
  store.deleteCase(caseId);
  res.json({ message: 'Case deleted successfully' });
});

module.exports = router;
