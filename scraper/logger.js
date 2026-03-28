const fs = require('fs');
const path = require('path');
const config = require('./config');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').substr(0, 19);
}

function getLogFileName() {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  return path.join(config.LOG_DIR, `scraper-${dateStr}.log`);
}

class Logger {
  constructor() {
    ensureDir(config.LOG_DIR);
    ensureDir(config.STORAGE_DIR);
  }

  log(level, message, data = null) {
    const timestamp = getTimestamp();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    console.log(logMessage);
    
    if (data) {
      console.log(JSON.stringify(data, null, 2));
    }

    const logFile = getLogFileName();
    const fullMessage = data 
      ? `${logMessage}\n${JSON.stringify(data, null, 2)}\n`
      : `${logMessage}\n`;
    
    fs.appendFileSync(logFile, fullMessage, 'utf8');
  }

  info(message, data = null) {
    this.log('info', message, data);
  }

  warn(message, data = null) {
    this.log('warn', message, data);
  }

  error(message, data = null) {
    this.log('error', message, data);
  }

  success(message, data = null) {
    this.log('success', message, data);
  }
}

module.exports = new Logger();
