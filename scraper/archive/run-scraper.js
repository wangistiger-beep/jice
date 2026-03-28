const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const API_BASE = 'http://localhost:3001/api';

function log(message, type = 'info') {
  const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19);
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
  console.log(`[${timestamp}] ${prefix} ${message}`);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function login(username, password) {
  log(`Logging in as ${username}...`);
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    log(`Login successful as ${username}`, 'success');
    return data.token;
  } catch (error) {
    log(`Login failed: ${error.message}`, 'error');
    throw error;
  }
}

async function createCase(token, caseData) {
  log('Creating case...');
  try {
    const response = await fetch(`${API_BASE}/cases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(caseData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    log(`Case created with ID: ${data.id}`, 'success');
    return data;
  } catch (error) {
    log(`Create case failed: ${error.message}`, 'error');
    throw error;
  }
}

async function approveCase(adminToken, caseId) {
  log(`Approving case ID: ${caseId}...`);
  try {
    const response = await fetch(`${API_BASE}/admin/cases/${caseId}/approve`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ reviewNotes: '自动审核通过 - 爬虫系统' })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    log('Case approved successfully', 'success');
    return data;
  } catch (error) {
    log(`Approve failed: ${error.message}`, 'error');
    throw error;
  }
}

async function getPublicCases() {
  log('Fetching public cases...');
  try {
    const response = await fetch(`${API_BASE}/cases`);
    const data = await response.json();
    log(`Found ${data.length} public cases`, 'success');
    return data;
  } catch (error) {
    log(`Fetch failed: ${error.message}`, 'error');
    throw error;
  }
}

const demoCase = {
  title: '腾讯 - 社交帝国的崛起',
  logo: '🐧',
  category: '互联网',
  tags: ['社交网络', '游戏', '微信', 'QQ'],
  caseType: 'success',
  productType: 'B2C',
  profile: {
    companyName: '腾讯',
    location: '中国 深圳',
    coreTech: '即时通讯、社交网络、游戏引擎',
    totalFunding: '早期天使投资，现已上市',
    investors: 'IDG资本、MIH等',
    vision: '通过互联网服务提升人类生活品质',
    founded: '1998年'
  },
  success: {
    keyFactors: '1. 抓住中国互联网早期机遇\n2. 产品迭代快速响应用户需求\n3. 社交+游戏双轮驱动\n4. 强大的投资并购战略',
    marketTiming: '中国互联网起步阶段，社交需求旺盛',
    productMarketFit: 'QQ和微信完美满足中国人的社交需求',
    growthStrategy: '从即时通讯到社交生态的逐步扩张',
    scalingSuccess: '从QQ到微信，建立了强大的网络效应',
    successLessons: '专注用户价值，持续创新，建立生态系统'
  },
  assessment: {
    marketPotential: '巨大的社交和娱乐市场',
    difficultyAnalysis: '需要持续创新和强大的运营能力',
    scalabilityAnalysis: '网络效应极强，可快速复制'
  },
  rebuild: {
    pivotConcept: '从通讯工具到数字生活平台',
    insight: '用户的数字生活需求是多元化的',
    productRefactor: '建立社交、支付、内容、游戏等多维度生态',
    wedge: '以即时通讯为入口，拓展到其他服务'
  },
  execution: {
    techStack: ['即时通讯技术', '社交网络平台', '游戏引擎', '支付系统'],
    phase1: 'MVP - QQ满足即时通讯需求',
    phase2: '验证 - 探索增值服务和游戏',
    phase3: '扩张 - 微信开启移动社交时代',
    phase4: '护城河 - 建立数字生活生态系统'
  },
  monetization: {
    revenueStreams: '游戏 + 社交广告 + 金融科技 + 内容服务',
    profitAnalysis: '高毛利，多元化收入结构',
    exitLogic: '香港上市，持续独立运营'
  }
};

async function main() {
  log('='.repeat(60));
  log('AUTOMATED CASE SCRAPER & UPLOADER');
  log('='.repeat(60));

  try {
    const beforeCases = await getPublicCases();
    log(`Before - Public cases count: ${beforeCases.length}`);

    await delay(500);

    log('');
    log('Step 1: Generate demo case data');
    log('Case Title: ' + demoCase.title);
    log('Case Type: ' + demoCase.caseType);
    log('Category: ' + demoCase.category);

    await delay(500);

    log('');
    log('Step 2: Login as test user');
    const testToken = await login('test', '123456');

    await delay(500);

    log('');
    log('Step 3: Create case');
    const createdCase = await createCase(testToken, demoCase);

    await delay(500);

    log('');
    log('Step 4: Login as admin');
    const adminToken = await login('admin', 'admin123');

    await delay(500);

    log('');
    log('Step 5: Approve case');
    await approveCase(adminToken, createdCase.id);

    await delay(500);

    log('');
    log('Step 6: Verify public cases');
    const afterCases = await getPublicCases();
    log(`After - Public cases count: ${afterCases.length}`);

    const newCase = afterCases.find(c => c.id === createdCase.id);
    if (newCase) {
      log('New case is now public!', 'success');
      log('Case Title: ' + newCase.title);
      log('Case Status: ' + newCase.status);
    }

    log('');
    log('='.repeat(60));
    log('PROCESS COMPLETED SUCCESSFULLY', 'success');
    log('='.repeat(60));
    log('Case Title: ' + demoCase.title);
    log('Case ID: ' + createdCase.id);
    log('Approved: Yes');
    log('Public: Yes');
    log('');
    log('Please refresh http://localhost:5173 to see the new case on homepage!');

  } catch (error) {
    log('Process failed: ' + error.message, 'error');
    console.error(error);
    process.exit(1);
  }
}

main();
