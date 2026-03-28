const fs = require('fs');
const path = require('path');
const config = require('./config');
const logger = require('./logger');

class Storage {
  constructor() {
    this.casesFile = path.join(config.STORAGE_DIR, 'cases.json');
    this.uploadedFile = path.join(config.STORAGE_DIR, 'uploaded.json');
    this.ensureFiles();
  }

  ensureFiles() {
    if (!fs.existsSync(config.STORAGE_DIR)) {
      fs.mkdirSync(config.STORAGE_DIR, { recursive: true });
    }
    
    if (!fs.existsSync(this.casesFile)) {
      fs.writeFileSync(this.casesFile, JSON.stringify([], null, 2), 'utf8');
    }
    
    if (!fs.existsSync(this.uploadedFile)) {
      fs.writeFileSync(this.uploadedFile, JSON.stringify([], null, 2), 'utf8');
    }
  }

  getCases() {
    try {
      const data = fs.readFileSync(this.casesFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      logger.error('Failed to read cases file', error);
      return [];
    }
  }

  saveCase(caseData) {
    try {
      const cases = this.getCases();
      cases.push({
        ...caseData,
        id: Date.now(),
        savedAt: new Date().toISOString()
      });
      fs.writeFileSync(this.casesFile, JSON.stringify(cases, null, 2), 'utf8');
      logger.info('Case saved to storage', { title: caseData.title });
      return true;
    } catch (error) {
      logger.error('Failed to save case', error);
      return false;
    }
  }

  isDuplicate(caseData) {
    const cases = this.getCases();
    const uploaded = this.getUploaded();
    
    const allTitles = [...cases, ...uploaded].map(c => c.title?.toLowerCase().trim());
    const titleToCheck = caseData.title?.toLowerCase().trim();
    
    if (titleToCheck && allTitles.includes(titleToCheck)) {
      logger.warn('Duplicate case detected', { title: caseData.title });
      return true;
    }
    
    return false;
  }

  getUploaded() {
    try {
      const data = fs.readFileSync(this.uploadedFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      logger.error('Failed to read uploaded file', error);
      return [];
    }
  }

  markAsUploaded(caseData, caseId) {
    try {
      const uploaded = this.getUploaded();
      uploaded.push({
        ...caseData,
        systemCaseId: caseId,
        uploadedAt: new Date().toISOString()
      });
      fs.writeFileSync(this.uploadedFile, JSON.stringify(uploaded, null, 2), 'utf8');
      
      const cases = this.getCases().filter(c => c.id !== caseData.id);
      fs.writeFileSync(this.casesFile, JSON.stringify(cases, null, 2), 'utf8');
      
      logger.info('Case marked as uploaded', { title: caseData.title, caseId });
      return true;
    } catch (error) {
      logger.error('Failed to mark case as uploaded', error);
      return false;
    }
  }

  getNextCaseToUpload() {
    const cases = this.getCases();
    return cases[0] || null;
  }
}

module.exports = new Storage();
