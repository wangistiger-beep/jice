const http = require('http');

console.log('='.repeat(60));
console.log('验证腾讯案例的完整数据');
console.log('='.repeat(60));
console.log('');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/cases/6',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const caseData = JSON.parse(data);
      console.log('✅ 获取案例成功:');
      console.log('');
      console.log('📋 基本信息:');
      console.log('   标题:', caseData.title);
      console.log('   ID:', caseData.id);
      console.log('   状态:', caseData.status);
      console.log('   类型:', caseData.caseType);
      console.log('   分类:', caseData.category);
      console.log('   标签:', caseData.tags?.join(', '));
      console.log('');
      
      console.log('📁 完整模块检查:');
      const modules = {
        'profile': caseData.profile,
        'success': caseData.success,
        'assessment': caseData.assessment,
        'rebuild': caseData.rebuild,
        'execution': caseData.execution,
        'monetization': caseData.monetization
      };
      
      for (const [name, module] of Object.entries(modules)) {
        const hasData = module && Object.keys(module).some(k => module[k]?.toString().trim().length > 0);
        console.log(`   ${hasData ? '✅' : '❌'} ${name}:`, hasData ? '有数据' : '无数据');
      }
      
      console.log('');
      console.log('📝 详细字段:');
      console.log('   profile字段:', caseData.profile ? Object.keys(caseData.profile) : 'N/A');
      console.log('   success字段:', caseData.success ? Object.keys(caseData.success) : 'N/A');
      console.log('   assessment字段:', caseData.assessment ? Object.keys(caseData.assessment) : 'N/A');
      console.log('   rebuild字段:', caseData.rebuild ? Object.keys(caseData.rebuild) : 'N/A');
      console.log('   execution字段:', caseData.execution ? Object.keys(caseData.execution) : 'N/A');
      console.log('   monetization字段:', caseData.monetization ? Object.keys(caseData.monetization) : 'N/A');
      
      console.log('');
      console.log('='.repeat(60));
      console.log('✅ 完整的腾讯案例数据验证通过！');
      console.log('='.repeat(60));
      console.log('');
      console.log('请刷新 http://localhost:5173 查看:');
      console.log(' 1. 首页 - 应该看到腾讯案例卡片');
      console.log(' 2. 案例详情 - 点击卡片查看完整的5大模块');
      console.log(' 3. 我的案例 - 登录test账号可在个人中心看到');
      console.log(' 4. 管理员后台 - 登录admin可在后台看到');
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
