const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { authenticateToken } = require('../middleware/auth');

const sensitiveWords = ['脏话1', '脏话2', '辱骂', '废物', '白痴', '傻逼', '他妈的', '操', '滚'];

function filterSensitiveWords(text) {
  let filteredText = text;
  let hasSensitiveWords = false;
  
  sensitiveWords.forEach(word => {
    if (filteredText.toLowerCase().includes(word.toLowerCase())) {
      hasSensitiveWords = true;
      const regex = new RegExp(word, 'gi');
      filteredText = filteredText.replace(regex, '*'.repeat(word.length));
    }
  });
  
  return { filteredText, hasSensitiveWords };
}

router.post('/cases/:id/view', (req, res) => {
  const caseId = Number(req.params.id);
  const updatedCase = store.incrementCaseViews(caseId);
  
  if (!updatedCase) {
    return res.status(404).json({ error: 'Case not found' });
  }
  
  res.json({ success: true, views: updatedCase.views });
});

router.get('/cases/:id', (req, res) => {
  const caseId = Number(req.params.id);
  const caseData = store.getCaseWithStats(caseId);
  
  if (!caseData) {
    return res.status(404).json({ error: 'Case not found' });
  }
  
  res.json(caseData);
});

router.post('/cases/:id/like', authenticateToken, (req, res) => {
  const caseId = Number(req.params.id);
  const result = store.toggleLike(req.user.id, caseId);
  res.json(result);
});

router.get('/cases/:id/likes', authenticateToken, (req, res) => {
  const caseId = Number(req.params.id);
  const likes = store.getUserLikes(req.user.id);
  res.json({ liked: likes.includes(caseId) });
});

router.get('/cases/:id/comments', (req, res) => {
  const caseId = Number(req.params.id);
  const comments = store.getCommentsByCase(caseId);
  
  const commentsWithUsernames = comments.map(c => {
    const user = store.getUserById(c.userId);
    return {
      ...c,
      username: user?.username || '匿名用户'
    };
  });
  
  res.json(commentsWithUsernames);
});

router.post('/cases/:id/comments', authenticateToken, (req, res) => {
  const caseId = Number(req.params.id);
  const { content } = req.body;
  
  if (!content || !content.trim()) {
    return res.status(400).json({ error: '评论内容不能为空' });
  }
  
  const { filteredText, hasSensitiveWords } = filterSensitiveWords(content);
  
  if (hasSensitiveWords) {
    return res.status(400).json({ 
      error: '评论包含敏感词汇，请修改后重试',
      filteredText 
    });
  }
  
  const comment = store.createComment({
    caseId,
    userId: req.user.id,
    content: filteredText
  });
  
  res.status(201).json(comment);
});

router.delete('/comments/:id', authenticateToken, (req, res) => {
  const commentId = Number(req.params.id);
  const deleted = store.deleteComment(commentId);
  
  if (!deleted) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  
  res.json({ message: 'Comment deleted successfully' });
});

router.get('/dashboard/stats', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.sendStatus(403);
  }
  
  const stats = store.getDashboardStats();
  res.json(stats);
});

router.get('/recommended', (req, res) => {
  const cases = store.getRecommendedCases();
  res.json(cases);
});

router.get('/sorted', (req, res) => {
  const { sortBy, sortOrder = 'desc' } = req.query;
  const cases = store.getSortedCases(sortBy, sortOrder);
  res.json(cases);
});

module.exports = router;
