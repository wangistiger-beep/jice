const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

require('./data/store');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const caseRoutes = require('./routes/cases');
const tagsRoutes = require('./routes/tags');
const interactionsRoutes = require('./routes/interactions');

const app = express();
const PORT = process.env.PORT || 3001;

const distPath = path.join(__dirname, '..', 'dist');
const shouldServeDist = process.env.NODE_ENV === 'production' || process.env.SERVE_DIST === 'true';

app.use(helmet());
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(s => s.trim()).filter(Boolean)
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'];

app.use(cors({
  origin: corsOrigins,
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (!shouldServeDist) {
  app.get('/', (req, res) => {
    res.json({
      message: 'Loot Drop Backend API',
      version: '1.0.0',
      status: 'running',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth',
        admin: '/api/admin',
        cases: '/api/cases',
        tags: '/api/tags',
        interactions: '/api/interactions'
      },
      documentation: 'See API.md for full documentation'
    });
  });
}

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/interactions', interactionsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

if (shouldServeDist) {
  app.use(express.static(distPath));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   Loot Drop Backend Server                                   ║
║                                                               ║
║   Server running at: http://localhost:${PORT}                   ║
║   API Health: http://localhost:${PORT}/api/health             ║
║                                                               ║
║   Default Admin:                                             ║
║   - Username: admin                                          ║
║   - Password: admin123                                       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
