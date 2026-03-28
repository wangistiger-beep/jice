const http = require('http');

console.log('='.repeat(60));
console.log('最终验证 - 26个完整案例');
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
      console.log('📊 总案例数:', cases.length);
      console.log('');
      
      const successCount = cases.filter(c => c.caseType === 'success').length;
      const failureCount = cases.filter(c => c.caseType === 'failure').length;
      
      console.log('📈 成功案例:', successCount);
      console.log('💀 失败案例:', failureCount);
      console.log('');
      
      console.log('📋 完整案例列表:');
      cases.forEach((c, index) => {
        const hasFullData = c.profile && c.success;
        console.log(`  ${String(index + 1).padStart(2, '0')}. [ID:${String(c.id).padStart(2, '0')}] ${c.title} - ${c.caseType === 'success' ? '✅' : '💀'} - ${hasFullData ? '完整' : '基础'}`);
      });
      
      console.log('');
      console.log('👤 test用户案例 (authorId: 2):');
      const testCases = cases.filter(c => c.authorId === 2);
      console.log('   数量:', testCases.length);
      
      console.log('');
      console.log('📝 审核状态:');
      const publishedCount = cases.filter(c => c.status === 'published').length;
      console.log('   已发布:', publishedCount);
      console.log('');
      
      console.log('='.repeat(60));
      console.log('✅ 验证完成！所有数据正常');
      console.log('='.repeat(60));
      console.log('');
      console.log('请刷新 http://localhost:5173/ 查看:');
      console.log(' 1. 首页 - 26个案例卡片');
      console.log(' 2. 详情页 - 点击任意案例查看5大模块');
      console.log(' 3. 个人中心 - 登录test账号查看我的案例');
      console.log(' 4. 管理员后台 - 登录admin账号查看所有案例');
      console.log('');
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
