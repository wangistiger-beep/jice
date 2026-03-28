const http = require('http');

console.log('='.repeat(60));
console.log('验证API数据');
console.log('='.repeat(60));
console.log('');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/cases',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const cases = JSON.parse(data);
      console.log('✅ API响应成功');
      console.log('');
      console.log('📊 案例总数:', cases.length);
      console.log('');
      console.log('📋 案例列表:');
      cases.forEach((c, index) => {
        console.log(`  ${index + 1}. [ID:${c.id}] ${c.title} - ${c.status} - ${c.caseType}`);
      });
      console.log('');
      
      const newCase = cases.find(c => c.id === 6);
      if (newCase) {
        console.log('✅ 新案例"腾讯 - 社交帝国的崛起"已在API中！');
        console.log('   状态:', newCase.status);
        console.log('   分类:', newCase.category);
        console.log('   标签:', newCase.tags?.join(', '));
      } else {
        console.log('❌ 未找到新案例');
      }
      
      console.log('');
      console.log('='.repeat(60));
      console.log('请刷新 http://localhost:5173 查看！');
      console.log('='.repeat(60));
    } catch (error) {
      console.error('❌ 解析响应失败:', error.message);
      console.log('原始响应:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ 请求失败:', error.message);
});

req.end();
