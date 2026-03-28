const fetch = require('node-fetch');
const config = require('./config');
const logger = require('./logger');

class APIClient {
  constructor() {
    this.token = null;
    this.user = null;
  }

  async request(endpoint, options = {}) {
    const url = `${config.API_BASE}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const fetchOptions = {
      ...options,
      headers
    };

    logger.info(`API Request: ${options.method || 'GET'} ${endpoint}`);

    try {
      const response = await fetch(url, fetchOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      logger.error(`API Request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async login(username, password) {
    try {
      const data = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });

      this.token = data.token;
      this.user = data.user;
      logger.success('Login successful', { username, role: data.user.role });
      return true;
    } catch (error) {
      logger.error('Login failed', { username, error: error.message });
      return false;
    }
  }

  async createCase(caseData) {
    try {
      const data = await this.request('/cases', {
        method: 'POST',
        body: JSON.stringify(caseData)
      });
      logger.success('Case created', { id: data.id, title: data.title });
      return data;
    } catch (error) {
      logger.error('Failed to create case', { error: error.message });
      throw error;
    }
  }

  async approveCase(caseId, reviewNotes = '自动审核通过') {
    try {
      const data = await this.request(`/admin/cases/${caseId}/approve`, {
        method: 'PUT',
        body: JSON.stringify({ reviewNotes })
      });
      logger.success('Case approved', { caseId });
      return data;
    } catch (error) {
      logger.error('Failed to approve case', { caseId, error: error.message });
      throw error;
    }
  }

  async getPublicCases() {
    try {
      const data = await this.request('/cases');
      logger.info('Fetched public cases', { count: data.length });
      return data;
    } catch (error) {
      logger.error('Failed to fetch public cases', { error: error.message });
      throw error;
    }
  }
}

module.exports = new APIClient();
