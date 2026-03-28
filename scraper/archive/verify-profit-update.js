const http = require('http');

console.log('='.repeat(60));
console.log('验证盈利金额更新');
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
      
      const successCases = cases.filter(c => c.caseType === 'success');
      console.log('📈 成功案例数:', successCases.length);
      console.log('');
      
      console.log('💰 检查盈利金额:');
      let hasProfit = 0;
      
      successCases.forEach((c, index) => {
        if (c.profitAmount && c.profitAmount !== '见详情') {
          hasProfit++;
          console.log(`  ${index + 1}. [ID:${c.id}] ${c.title}`);
          console.log(`      💰 盈利金额: ${c.profitAmount}`);
        }
      });
      
      console.log('');
      console.log(`✅ 有具体盈利金额的成功案例: ${hasProfit}/${successCases.length}`);
      
      if (hasProfit === successCases.length) {
        console.log('');
        console.log('='.repeat(60));
        console.log('✅ 所有成功案例盈利金额已更新！');
        console.log('='.repeat(60));
      } else {
        console.log('');
        console.log('⚠️ 仍有部分成功案例盈利金额为"见详情"');
      }
      
      console.log('');
      console.log('前5个案例预览:');
      cases.slice(0, 5).forEach((c, index) => {
        const amount = c.caseType === 'success' ? c.profitAmount : c.lossAmount;
        console.log(`  ${index + 1}. [ID:${c.id}] ${c.title} - ${c.caseType === 'success' ? '✅成功' : '💀失败'} - ${amount || 'N/A'}`);
      });
      
      console.log('');
      console.log('='.repeat(60));
      console.log('请刷新浏览器 http://localhost:5173/ 查看前端卡片！');
      console.log('='.repeat(60));
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
