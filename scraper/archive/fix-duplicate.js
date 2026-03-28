const fs = require('fs');
const path = require('path');

console.log('修复重复案例');
console.log('');

const dbPath = path.join(__dirname, '..', 'backend', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('当前案例数:', db.cases.length);

const idCounts = {};
db.cases.forEach(c => {
  idCounts[c.id] = (idCounts[c.id] || 0) + 1;
});

const duplicates = Object.keys(idCounts).filter(id => idCounts[id] > 1);
console.log('重复的ID:', duplicates);

const uniqueCases = [];
const seenIds = new Set();

db.cases.forEach(c => {
  if (!seenIds.has(c.id)) {
    seenIds.add(c.id);
    uniqueCases.push(c);
  } else {
    console.log('删除重复案例:', c.title);
  }
});

db.cases = uniqueCases;
console.log('去重后案例数:', db.cases.length);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('');
console.log('✅ 数据库已修复');
