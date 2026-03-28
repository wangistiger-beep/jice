const path = require('path');

module.exports = {
  API_BASE: 'http://localhost:3001/api',
  CREDENTIALS: {
    username: 'test',
    password: '123456'
  },
  ADMIN_CREDENTIALS: {
    username: 'admin',
    password: 'admin123'
  },
  REQUEST_DELAY: 2000,
  MAX_RETRIES: 3,
  USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  STORAGE_DIR: path.join(__dirname, 'data'),
  LOG_DIR: path.join(__dirname, 'logs'),
  CATEGORIES: [
    'SaaS', '人工智能', '医疗科技', '金融科技', '电子商务', '社交',
    '平台', '食品科技', '出行', '媒体', '硬件', 'B2C', 'B2B',
    '清洁科技', '加密货币', '生物科技', '物流', '汽车', '共享经济', '金融', '互联网', '房地产', '其他'
  ],
  CASE_TYPES: ['success', 'failure']
};
