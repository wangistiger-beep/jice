const http = require('http');

console.log('='.repeat(60));
console.log('全面优化最终验证');
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
      
      console.log('🔍 检查新字段:');
      let hasProfitAmount = 0;
      let hasLossAmount = 0;
      let hasMarketScore = 0;
      let hasPotentialScale = 0;
      let hasRebuildPotential = 0;
      
      cases.forEach((c, index) => {
        if (c.profitAmount) hasProfitAmount++;
        if (c.lossAmount) hasLossAmount++;
        if (c.marketPotentialScore) hasMarketScore++;
        if (c.potentialScale) hasPotentialScale++;
        if (c.rebuildPotential) hasRebuildPotential++;
      });
      
      console.log(`  - profitAmount: ${hasProfitAmount}/${cases.length}`);
      console.log(`  - lossAmount: ${hasLossAmount}/${cases.length}`);
      console.log(`  - marketPotentialScore: ${hasMarketScore}/${cases.length}`);
      console.log(`  - potentialScale: ${hasPotentialScale}/${cases.length}`);
      console.log(`  - rebuildPotential: ${hasRebuildPotential}/${cases.length}`);
      console.log('');
      
      console.log('📋 前5个案例示例:');
      cases.slice(0, 5).forEach((c, index) => {
        const amount = c.caseType === 'success' ? c.profitAmount : c.lossAmount;
        console.log(`  ${index + 1}. [ID:${c.id}] ${c.title}`);
        console.log(`      类型: ${c.caseType === 'success' ? '✅ 成功' : '💀 失败'}`);
        console.log(`      金额: ${amount || 'N/A'}`);
        console.log(`      评分: 市场潜力=${c.marketPotentialScore}/5, 潜在规模=${c.potentialScale}/5${c.caseType === 'failure' ? `, 重建潜力=${c.rebuildPotential}/5` : ''}`);
      });
      
      console.log('');
      console.log('='.repeat(60));
      console.log('✅ 优化验证完成！');
      console.log('='.repeat(60));
      console.log('');
      console.log('优化内容总结:');
      console.log('  1. 数据库迁移 - 新增5个字段');
      console.log('  2. 案例卡片优化 - 显示盈利/亏损金额');
      console.log('  3. 评分字段替换 - 市场潜力/潜在规模/重建潜力');
      console.log('  4. 上传表单优化 - 动态显示金额输入框');
      console.log('  5. 描述内容优化 - 自动生成默认描述');
      console.log('');
      console.log('请刷新浏览器 http://localhost:5173/ 查看效果！');
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
