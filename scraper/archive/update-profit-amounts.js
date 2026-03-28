const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('更新成功企业盈利金额');
console.log('='.repeat(60));
console.log('');

const dbPath = path.join(__dirname, '..', 'backend', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('📊 当前案例数:', db.cases.length);
console.log('');

const profitData = {
  1: '约1200亿美元（2023年营收）',
  3: '约800亿美元（2023年营收）',
  6: '约6000亿人民币（2023年营收）',
  7: '约10000亿人民币（2023年营收）',
  8: '约1000亿美元（2023年营收）',
  9: '约2500亿人民币（2023年营收）',
  13: '约10000亿人民币（2023年营收）',
  14: '约2300亿人民币（2023年营收）',
  15: '约2800亿人民币（2023年营收）',
  18: '约2500亿人民币（2023年营收）',
  19: '约1300亿人民币（2023年营收）',
  20: '约220亿人民币（2023年营收）',
  22: '约600亿人民币（2023年营收）',
  23: '约25亿美元（2023年营收）',
  24: '约350亿美元（2023年营收）',
  25: '约50亿美元（2023年营收）'
};

console.log('🔧 更新盈利金额:');
let updatedCount = 0;

db.cases.forEach((c, index) => {
  if (c.caseType === 'success' && profitData[c.id]) {
    c.profitAmount = profitData[c.id];
    updatedCount++;
    console.log(`  [${index + 1}] ${c.title} -> ${c.profitAmount}`);
  }
});

console.log('');
console.log('✅ 更新案例数:', updatedCount);

console.log('');
console.log('💾 保存数据库');
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('数据库已保存');

console.log('');
console.log('='.repeat(60));
console.log('✅ 盈利金额更新完成！');
console.log('='.repeat(60));
console.log('');
console.log('请重启后端服务器后刷新 http://localhost:5173 查看！');
console.log('');
