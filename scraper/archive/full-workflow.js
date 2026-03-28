const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('使用后端测试脚本执行完整流程');
console.log('='.repeat(60));

const dbPath = path.join(__dirname, '..', 'backend', 'data', 'db.json');

console.log('');
console.log('📚 步骤1: 读取当前数据库');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
console.log('当前案例数:', db.cases.length);
console.log('当前用户数:', db.users.length);

const newCase = {
  id: db.cases.length + 1,
  title: '腾讯 - 社交帝国的崛起',
  logo: '🐧',
  category: '互联网',
  tags: ['社交网络', '游戏', '微信', 'QQ'],
  caseType: 'success',
  productType: 'B2C',
  status: 'published',
  authorId: 2,
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
  },
  reviewNotes: '自动审核通过 - 爬虫系统',
  reviewedAt: new Date().toISOString(),
  reviewedBy: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

console.log('');
console.log('📝 步骤2: 添加新案例到数据库');
db.cases.push(newCase);
console.log('新案例ID:', newCase.id);
console.log('新案例标题:', newCase.title);

console.log('');
console.log('💾 步骤3: 保存数据库');
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('数据库已保存');

console.log('');
console.log('✅ 步骤4: 验证数据库');
const verifyDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
console.log('更新后案例数:', verifyDb.cases.length);
const addedCase = verifyDb.cases.find(c => c.id === newCase.id);
console.log('新案例状态:', addedCase ? addedCase.status : '未找到');

console.log('');
console.log('='.repeat(60));
console.log('流程完成！');
console.log('='.repeat(60));
console.log('案例ID:', newCase.id);
console.log('案例标题:', newCase.title);
console.log('案例状态:', 'published');
console.log('');
console.log('请刷新 http://localhost:5173 查看新案例！');
console.log('');
