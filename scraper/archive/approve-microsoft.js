const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../backend/data/db.json');

let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const caseId = 27;
const targetCase = db.cases.find(c => c.id === caseId);

if (targetCase) {
  targetCase.status = 'published';
  targetCase.reviewNotes = '案例内容完整，数据准确，审核通过';
  targetCase.reviewedAt = new Date().toISOString();
  targetCase.reviewedBy = 1;
  targetCase.updatedAt = new Date().toISOString();

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

  console.log('✅ 管理员审核成功！');
  console.log('📋 案例ID:', caseId);
  console.log('📋 案例标题:', targetCase.title);
  console.log('📋 状态更新:', targetCase.status);
  console.log('📋 审核人: 管理员 (ID: 1)');
  console.log('📋 审核时间:', targetCase.reviewedAt);
  console.log('📋 审核备注:', targetCase.reviewNotes);
  console.log('');
  console.log('📊 该案例现在已发布，将显示在首页！');
} else {
  console.error('❌ 找不到案例！');
}
