const http = require('http');

http.get('http://localhost:3001/api/cases/27', (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📊 状态码:', res.statusCode);
    try {
      const caseData = JSON.parse(data);
      console.log('✅ 获取案例成功!');
      console.log('  案例ID:', caseData.id);
      console.log('  标题:', caseData.title);
      console.log('  状态:', caseData.status);
      console.log('  盈利金额:', caseData.profitAmount);
      console.log('  是否有profile:', !!caseData.profile);
      console.log('  是否有success:', !!caseData.success);
      console.log('  是否有assessment:', !!caseData.assessment);
      console.log('  是否有rebuild:', !!caseData.rebuild);
      console.log('  是否有execution:', !!caseData.execution);
      console.log('  是否有monetization:', !!caseData.monetization);
    } catch (e) {
      console.error('❌ 解析失败:', e.message);
      console.log('原始数据:', data);
    }
  });
  
}).on('error', (err) => {
  console.error('❌ 请求失败:', err.message);
});
