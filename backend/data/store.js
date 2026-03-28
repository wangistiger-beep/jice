const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const defaultData = {
  users: [],
  cases: [],
  caseDetails: [],
  auditLogs: [],
  tags: [],
  comments: [],
  likes: [],
  nextUserId: 1,
  nextCaseId: 1,
  nextDetailId: 1,
  nextLogId: 1,
  nextTagId: 1,
  nextCommentId: 1,
  nextLikeId: 1
};

function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      return { ...defaultData, ...data };
    } catch (e) {
      return { ...defaultData };
    }
  }
  return { ...defaultData };
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

let db = loadData();

if (db.users.length === 0) {
  const adminPassword = bcrypt.hashSync('admin123', 10);
  db.users.push({
    id: db.nextUserId++,
    username: 'admin',
    email: 'admin@loot-drop.io',
    password: adminPassword,
    role: 'admin',
    status: 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  saveData(db);
  console.log('Admin user created');
}

const store = {
  getUsers: () => [...db.users],
  getUserById: (id) => db.users.find(u => u.id === id),
  getUserByUsername: (username) => db.users.find(u => u.username === username || u.email === username),
  createUser: (user) => {
    const newUser = {
      id: db.nextUserId++,
      ...user,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.users.push(newUser);
    saveData(db);
    return newUser;
  },
  updateUser: (id, updates) => {
    const index = db.users.findIndex(u => u.id === id);
    if (index !== -1) {
      db.users[index] = { ...db.users[index], ...updates, updatedAt: new Date().toISOString() };
      saveData(db);
      return db.users[index];
    }
    return null;
  },

  getCases: () => [...db.cases],
  getPublishedCases: () => db.cases.filter(c => c.status === 'published'),
  getCaseById: (id) => db.cases.find(c => c.id === id),
  getCasesByAuthor: (authorId) => db.cases.filter(c => c.authorId === authorId),
  getPendingCases: () => db.cases.filter(c => c.status === 'pending'),
  getRecommendedCases: () => {
    return db.cases
      .filter(c => c.status === 'published' && c.isRecommended)
      .sort((a, b) => new Date(b.recommendedAt) - new Date(a.recommendedAt))
      .slice(0, 3);
  },
  createCase: (caseData) => {
    const newCase = {
      id: db.nextCaseId++,
      ...caseData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.cases.push(newCase);
    saveData(db);
    return newCase;
  },
  updateCase: (id, updates) => {
    const index = db.cases.findIndex(c => c.id === id);
    if (index !== -1) {
      db.cases[index] = { ...db.cases[index], ...updates, updatedAt: new Date().toISOString() };
      saveData(db);
      return db.cases[index];
    }
    return null;
  },
  deleteCase: (id) => {
    const index = db.cases.findIndex(c => c.id === id);
    if (index !== -1) {
      db.cases.splice(index, 1);
      const detailIndex = db.caseDetails.findIndex(d => d.caseId === id);
      if (detailIndex !== -1) {
        db.caseDetails.splice(detailIndex, 1);
      }
      saveData(db);
      return true;
    }
    return false;
  },

  getCaseDetails: (caseId) => db.caseDetails.find(d => d.caseId === caseId),
  createCaseDetails: (details) => {
    const newDetails = {
      id: db.nextDetailId++,
      ...details
    };
    db.caseDetails.push(newDetails);
    saveData(db);
    return newDetails;
  },
  updateCaseDetails: (caseId, updates) => {
    const index = db.caseDetails.findIndex(d => d.caseId === caseId);
    if (index !== -1) {
      db.caseDetails[index] = { ...db.caseDetails[index], ...updates };
      saveData(db);
      return db.caseDetails[index];
    }
    return null;
  },

  addAuditLog: (log) => {
    const newLog = {
      id: db.nextLogId++,
      ...log,
      createdAt: new Date().toISOString()
    };
    db.auditLogs.push(newLog);
    saveData(db);
    return newLog;
  },
  getAuditLogs: (limit = 100) => [...db.auditLogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit),

  getTags: () => {
    const tagMap = new Map();
    
    db.cases.forEach(c => {
      if (c.tags && Array.isArray(c.tags)) {
        c.tags.forEach(tagName => {
          if (tagName && tagName.trim()) {
            const name = tagName.trim();
            if (tagMap.has(name)) {
              tagMap.get(name).caseCount++;
            } else {
              const existingTag = db.tags.find(t => t.name === name);
              tagMap.set(name, {
                id: existingTag?.id || db.nextTagId++,
                name: name,
                description: existingTag?.description || '',
                caseCount: 1,
                createdAt: existingTag?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString()
              });
            }
          }
        });
      }
    });
    
    const tags = Array.from(tagMap.values()).sort((a, b) => b.caseCount - a.caseCount);
    
    db.tags = tags;
    saveData(db);
    
    return tags;
  },

  getTagById: (id) => db.tags.find(t => t.id === id),

  getTagByName: (name) => db.tags.find(t => t.name === name),

  createTag: (tagData) => {
    const existingTag = db.tags.find(t => t.name === tagData.name.trim());
    if (existingTag) {
      return existingTag;
    }
    
    const newTag = {
      id: db.nextTagId++,
      name: tagData.name.trim(),
      description: tagData.description || '',
      caseCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.tags.push(newTag);
    saveData(db);
    return newTag;
  },

  updateTag: (id, updates) => {
    const index = db.tags.findIndex(t => t.id === id);
    if (index !== -1) {
      db.tags[index] = { 
        ...db.tags[index], 
        ...updates, 
        name: updates.name ? updates.name.trim() : db.tags[index].name,
        updatedAt: new Date().toISOString() 
      };
      saveData(db);
      return db.tags[index];
    }
    return null;
  },

  deleteTag: (id) => {
    const index = db.tags.findIndex(t => t.id === id);
    if (index !== -1) {
      const tag = db.tags[index];
      db.cases.forEach(c => {
        if (c.tags && Array.isArray(c.tags)) {
          c.tags = c.tags.filter(t => t !== tag.name);
        }
      });
      db.tags.splice(index, 1);
      saveData(db);
      return true;
    }
    return false;
  },

  searchTags: (query) => {
    const q = query.toLowerCase().trim();
    if (!q) return store.getTags();
    return store.getTags().filter(t => 
      t.name.toLowerCase().includes(q) || 
      (t.description && t.description.toLowerCase().includes(q))
    );
  },

  getStatistics: () => ({
    totalUsers: db.users.length,
    totalCases: db.cases.length,
    pendingUsers: db.users.filter(u => u.status === 'pending').length,
    pendingCases: db.cases.filter(c => c.status === 'pending').length,
    recentLogs: [...db.auditLogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 20)
  }),

  incrementCaseViews: (caseId) => {
    const caseIndex = db.cases.findIndex(c => c.id === caseId);
    if (caseIndex !== -1) {
      const caseData = db.cases[caseIndex];
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const thisWeek = getWeekNumber(now);
      const thisMonth = now.getMonth();
      
      if (!caseData.views) {
        caseData.views = { total: 0, weekly: {}, monthly: {} };
      }
      
      caseData.views.total++;
      caseData.views.weekly[thisWeek] = (caseData.views.weekly[thisWeek] || 0) + 1;
      caseData.views.monthly[thisMonth] = (caseData.views.monthly[thisMonth] || 0) + 1;
      caseData.views.lastViewed = now.toISOString();
      
      db.cases[caseIndex] = { ...caseData, updatedAt: now.toISOString() };
      saveData(db);
      return db.cases[caseIndex];
    }
    return null;
  },

  getCaseWithStats: (caseId) => {
    const caseData = store.getCaseById(caseId);
    if (!caseData) return null;
    
    const likes = db.likes.filter(l => l.caseId === caseId);
    const comments = db.comments.filter(c => c.caseId === caseId && c.status === 'approved');
    
    return {
      ...caseData,
      likeCount: likes.length,
      commentCount: comments.length,
      views: caseData.views || { total: 0 }
    };
  },

  toggleLike: (userId, caseId) => {
    const existingLikeIndex = db.likes.findIndex(l => l.userId === userId && l.caseId === caseId);
    
    if (existingLikeIndex !== -1) {
      db.likes.splice(existingLikeIndex, 1);
      saveData(db);
      return { liked: false };
    } else {
      const newLike = {
        id: db.nextLikeId++,
        userId,
        caseId,
        createdAt: new Date().toISOString()
      };
      db.likes.push(newLike);
      saveData(db);
      return { liked: true };
    }
  },

  getUserLikes: (userId) => {
    return db.likes.filter(l => l.userId === userId).map(l => l.caseId);
  },

  getCommentsByCase: (caseId) => {
    return db.comments
      .filter(c => c.caseId === caseId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  createComment: (commentData) => {
    const newComment = {
      id: db.nextCommentId++,
      ...commentData,
      status: 'approved',
      createdAt: new Date().toISOString()
    };
    db.comments.push(newComment);
    saveData(db);
    return newComment;
  },

  deleteComment: (commentId) => {
    const index = db.comments.findIndex(c => c.id === commentId);
    if (index !== -1) {
      db.comments.splice(index, 1);
      saveData(db);
      return true;
    }
    return false;
  },

  getDashboardStats: () => {
    const totalViews = db.cases.reduce((sum, c) => sum + (c.views?.total || 0), 0);
    const totalLikes = db.likes.length;
    const totalComments = db.comments.length;
    
    return {
      totalViews,
      totalLikes,
      totalComments,
      topCases: [...db.cases]
        .sort((a, b) => (b.views?.total || 0) - (a.views?.total || 0))
        .slice(0, 10)
        .map(c => ({
          id: c.id,
          title: c.title,
          views: c.views?.total || 0,
          likes: db.likes.filter(l => l.caseId === c.id).length
        }))
    };
  },

  getSortedCases: (sortBy, sortOrder = 'desc') => {
    let sorted = [...db.cases].filter(c => c.status === 'published');
    
    const now = new Date();
    const thisWeek = getWeekNumber(now);
    const thisMonth = now.getMonth();
    
    switch (sortBy) {
      case 'publishDate':
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'weeklyViews':
        sorted.sort((a, b) => (a.views?.weekly?.[thisWeek] || 0) - (b.views?.weekly?.[thisWeek] || 0));
        break;
      case 'monthlyViews':
        sorted.sort((a, b) => (a.views?.monthly?.[thisMonth] || 0) - (b.views?.monthly?.[thisMonth] || 0));
        break;
      case 'totalViews':
        sorted.sort((a, b) => (a.views?.total || 0) - (b.views?.total || 0));
        break;
      case 'weeklyRecommend':
      case 'monthlyRecommend':
      case 'totalRecommend':
        sorted.sort((a, b) => {
          const scoreA = (a.views?.total || 0) * 0.5 + db.likes.filter(l => l.caseId === a.id).length * 0.3 + db.comments.filter(c => c.caseId === a.id).length * 0.2;
          const scoreB = (b.views?.total || 0) * 0.5 + db.likes.filter(l => l.caseId === b.id).length * 0.3 + db.comments.filter(c => c.caseId === b.id).length * 0.2;
          return scoreA - scoreB;
        });
        break;
      default:
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    
    if (sortOrder === 'desc') {
      sorted.reverse();
    }
    
    return sorted;
  }
};

function getWeekNumber(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}


module.exports = store;
