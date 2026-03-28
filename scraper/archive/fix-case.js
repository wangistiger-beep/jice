const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('删除并重新创建完整的腾讯案例');
console.log('='.repeat(60));
console.log('');

const dbPath = path.join(__dirname, '..', 'backend', 'data', 'db.json');

console.log('📚 步骤1: 读取数据库');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
console.log('当前案例数:', db.cases.length);

console.log('');
console.log('🗑️ 步骤2: 删除ID为6的案例');
db.cases = db.cases.filter(c => c.id !== 6);
db.nextCaseId = 6;
console.log('删除后案例数:', db.cases.length);

console.log('');
console.log('✅ 步骤3: 创建完整的腾讯案例');
const tencentCase = {
  id: 6,
  title: '腾讯 - 社交帝国的崛起',
  logo: '🐧',
  category: '互联网',
  tags: ['社交网络', '游戏', '微信', 'QQ', '投资并购'],
  caseType: 'success',
  productType: '平台',
  status: 'published',
  authorId: 2,
  disclaimer: '本案例仅供学习参考，基于公开信息整理。',
  profile: {
    companyName: '腾讯控股有限公司',
    location: '中国 深圳',
    coreTech: '即时通讯技术、社交网络平台、游戏引擎、支付系统',
    totalFunding: '早期天使投资，香港IPO融资约14亿港元',
    investors: 'IDG资本、MIH（Naspers）',
    vision: '通过互联网服务提升人类生活品质',
    founded: '1998',
    closed: '',
    cashBurned: ''
  },
  success: {
    successFactor: '1. 抓住中国互联网早期机遇，QQ满足即时通讯刚需\n2. 产品快速迭代，响应用户需求变化\n3. 社交+游戏双轮驱动，构建高粘性生态\n4. 强大的投资并购战略，完善产业布局\n5. 从PC到移动的成功转型',
    marketStrategy: '从学生群体切入，逐步扩展到全年龄段用户；通过免费IM建立用户基础，再通过增值服务和游戏变现；农村包围城市，先渗透二三线城市再攻占一线城市',
    businessModel: 'QQ会员/红钻等增值服务 + 网络游戏收入 + 社交广告 + 金融科技（微信支付）+ 投资收益',
    techInnovation: '1. 稳定的即时通讯技术架构，承载亿级并发\n2. QQ秀等虚拟物品创新，开创中国增值服务先河\n3. 微信的简洁产品设计与微创新\n4. 微信支付的扫码支付创新\n5. 游戏引擎与运营平台',
    growthStrategy: '1. 病毒式传播 + 口碑传播\n2. 绑定手机号 + 实名认证，建立信任机制\n3. 从PC到移动的平滑过渡（微信）\n4. 通过投资并购扩展边界\n5. 国际化尝试（WeChat）',
    successLessons: '1. 刚需切入，免费获取用户，再考虑变现\n2. 持续关注用户体验，快速产品迭代\n3. 建立高粘性社交关系链，构筑护城河\n4. 现金流业务（游戏）为创新提供弹药\n5. 把握时代机遇，从PC到移动的成功转型\n6. 开放与合作，通过投资完善生态'
  },
  assessment: {
    marketPotential: '中国社交娱乐市场规模巨大，且存在国际化机会；从社交延伸到支付、内容、金融等领域，边界不断扩大',
    difficultyAnalysis: '需要持续的产品创新、强大的技术架构、敏感的政策嗅觉、以及对用户需求的深刻理解',
    scalabilityAnalysis: '网络效应极强，边际成本低；一旦建立社交关系链，用户迁移成本极高；可通过多元化变现提高ARPU值'
  },
  rebuild: {
    pivotConcept: '从即时通讯工具转型为数字生活基础设施平台',
    insight: '用户的需求不只是聊天，而是完整的数字生活：通讯、社交、娱乐、支付、购物、出行等',
    productRefactor: '从单一QQ产品，进化为QQ+微信双引擎，再到微信生态（支付、小程序、公众号），最终成为数字生活平台',
    wedge: '以即时通讯为入口，先建立用户关系链，再逐步扩展到其他服务'
  },
  execution: {
    techStack: 'C/C++后端架构、Android/iOS客户端、游戏引擎、大数据分析平台、支付系统、CDN加速',
    phase1: 'MVP - 简单的中文ICQ克隆（OICQ），验证即时通讯需求',
    phase2: '验证 - QQ秀、QQ会员等增值服务验证变现模式，同时建立技术架构承载亿级用户',
    phase3: '扩张 - 游戏业务起飞，成为现金牛；微信开启移动时代；投资并购完善生态',
    phase4: '护城河 - 微信支付+小程序建立数字生态，成为基础设施'
  },
  monetization: {
    revenueStreams: '1. 网络游戏（最大收入来源，包括自研+代理）\n2. 社交广告（朋友圈广告、公众号广告）\n3. 金融科技（微信支付手续费、理财通）\n4. 增值服务（QQ会员、视频会员、音乐会员等）\n5. 云服务\n6. 投资收益',
    profitAnalysis: '游戏和广告业务毛利率超过50%；网络效应显著，规模效应强；2023年营收约6000亿人民币，净利润约2000亿人民币',
    exitLogic: '2004年香港主板上市，市值从上市时约60亿港元增长到最高超过7万亿港元，成为中国市值最高的科技公司之一'
  },
  reviewerId: 1,
  reviewNotes: '案例内容完整，审核通过 - 完整数据补充',
  reviewedAt: new Date().toISOString(),
  reviewedBy: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

db.cases.push(tencentCase);
console.log('新案例ID:', tencentCase.id);
console.log('新案例标题:', tencentCase.title);
console.log('案例类型:', tencentCase.caseType);

console.log('');
console.log('💾 步骤4: 保存数据库');
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('数据库已保存');

console.log('');
console.log('✅ 步骤5: 验证');
const verifyDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
console.log('最终案例数:', verifyDb.cases.length);
const newCase = verifyDb.cases.find(c => c.id === 6);
console.log('新案例状态:', newCase ? newCase.status : '未找到');
console.log('新案例标题:', newCase ? newCase.title : '未找到');

console.log('');
console.log('='.repeat(60));
console.log('✅ 完整的腾讯案例已创建！');
console.log('='.repeat(60));
console.log('包含的完整模块:');
console.log(' 1. profile - 公司简介');
console.log(' 2. success - 成功要素');
console.log(' 3. assessment - 市场评估');
console.log(' 4. rebuild - 转型策略');
console.log(' 5. execution - 执行计划');
console.log(' 6. monetization - 盈利模式');
console.log('');
console.log('请重启后端服务器后刷新 http://localhost:5173 查看！');
console.log('');
