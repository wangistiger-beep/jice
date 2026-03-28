const config = require('./config');
const logger = require('./logger');
const storage = require('./storage');
const apiClient = require('./api-client');
const validator = require('./validator');

class Uploader {
  constructor() {
    this.maxRetries = config.MAX_RETRIES;
  }

  async login() {
    logger.info('Logging in as test user...');
    const success = await apiClient.login(
      config.CREDENTIALS.username,
      config.CREDENTIALS.password
    );

    if (!success) {
      throw new Error('Failed to login as test user');
    }

    return true;
  }

  async loginAsAdmin() {
    logger.info('Logging in as admin...');
    const success = await apiClient.login(
      config.ADMIN_CREDENTIALS.username,
      config.ADMIN_CREDENTIALS.password
    );

    if (!success) {
      throw new Error('Failed to login as admin');
    }

    return true;
  }

  async uploadCase(caseData, retryCount = 0) {
    try {
      logger.info(`Uploading case: ${caseData.title}`);
      
      const normalized = validator.normalizeCase(caseData);
      const validation = validator.validateCase(normalized);

      if (!validation.valid) {
        logger.error('Case validation failed', validation.errors);
        return { success: false, errors: validation.errors };
      }

      const createdCase = await apiClient.createCase(normalized);
      logger.success(`Case created with ID: ${createdCase.id}`);

      return { success: true, caseId: createdCase.id, caseData: createdCase };
    } catch (error) {
      if (retryCount < this.maxRetries) {
        logger.warn(`Upload failed, retrying (${retryCount + 1}/${this.maxRetries})...`);
        await this.delay(2000);
        return this.uploadCase(caseData, retryCount + 1);
      }

      logger.error('Upload failed after retries', error);
      return { success: false, error: error.message };
    }
  }

  async approveCase(caseId) {
    try {
      logger.info(`Approving case ID: ${caseId}`);
      await this.loginAsAdmin();
      
      const result = await apiClient.approveCase(caseId);
      logger.success(`Case approved successfully`);
      
      return { success: true, result };
    } catch (error) {
      logger.error('Approval failed', error);
      return { success: false, error: error.message };
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async processNextCase() {
    const caseToUpload = storage.getNextCaseToUpload();

    if (!caseToUpload) {
      logger.info('No cases to upload');
      return null;
    }

    logger.info(`Processing case: ${caseToUpload.title}`);

    await this.login();
    const uploadResult = await this.uploadCase(caseToUpload);

    if (!uploadResult.success) {
      logger.error('Failed to upload case', uploadResult);
      return null;
    }

    storage.markAsUploaded(caseToUpload, uploadResult.caseId);

    const approveResult = await this.approveCase(uploadResult.caseId);

    if (approveResult.success) {
      logger.success('Case published to homepage');
    } else {
      logger.warn('Case created but approval failed, manual review needed');
    }

    return {
      caseId: uploadResult.caseId,
      title: caseToUpload.title,
      approved: approveResult.success
    };
  }

  async run() {
    logger.info('='.repeat(60));
    logger.info('CASE UPLOADER STARTED');
    logger.info('='.repeat(60));

    try {
      const result = await this.processNextCase();
      
      if (result) {
        logger.success('Upload process completed');
        return result;
      } else {
        logger.info('No cases processed');
        return null;
      }
    } catch (error) {
      logger.error('Upload process failed', error);
      throw error;
    }
  }
}

module.exports = new Uploader();
