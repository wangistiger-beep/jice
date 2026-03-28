const http = require('http');

http.get('http://localhost:3001/api/cases', (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    const cases = JSON.parse(data);
    console.log('📊 API返回的案例总数:', cases.length);
    
    const microsoftCase = cases.find(c => c.id === 27);
    if (microsoftCase) {
      console.log('✅ 找到微软案例!');
      console.log('  案例ID:', microsoftCase.id);
      console.log('  标题:', microsoftCase.title);
      console.log('  状态:', microsoftCase.status);
      console.log('  盈利金额:', microsoftCase.profitAmount);
      console.log('  作者ID:', microsoftCase.authorId);
    } else {
      console.log('❌ 未找到微软案例');
      console.log('  所有案例ID:', cases.map(c => c.id));
    }
    
    const publishedCount = cases.filter(c => c.status === 'published').length;
    console.log('📊 已发布案例数:', publishedCount);
  });
  
}).on('error', (err) => {
  console.error('❌ 请求失败:', err.message);
});
