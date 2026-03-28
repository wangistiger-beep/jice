#!/usr/bin/env node

const { program } = require('commander');
const logger = require('./logger');
const config = require('./config');
const scraper = require('./scraper');
const uploader = require('./uploader');
const storage = require('./storage');

program
  .name('loot-drop-scraper')
  .description('Loot Drop 案例爬取与上传工具')
  .version('1.0.0');

program
  .command('full')
  .description('执行完整的爬取-上传-审核流程')
  .option('--api-url <url>', 'API基础URL', config.API_BASE)
  .option('--username <user>', '测试用户用户名', config.CREDENTIALS.username)
  .option('--password <pass>', '测试用户密码', config.CREDENTIALS.password)
  .option('--admin-username <user>', '管理员用户名', config.ADMIN_CREDENTIALS.username)
  .option('--admin-password <pass>', '管理员密码', config.ADMIN_CREDENTIALS.password)
  .action(async (options) => {
    updateConfig(options);
    logger.info('='.repeat(60));
    logger.info('完整流程开始');
    logger.info('='.repeat(60));
    
    try {
      await runFullWorkflow();
      process.exit(0);
    } catch (error) {
      logger.error('流程失败', error);
      process.exit(1);
    }
  });

program
  .command('scrape')
  .description('仅爬取新案例')
  .option('--demo', '生成演示案例（不实际爬取）')
  .action(async (options) => {
    logger.info('开始爬取案例...');
    try {
      const result = await scraper.run(options.demo);
      if (result) {
        logger.success('案例爬取成功:', result.title);
      }
      process.exit(0);
    } catch (error) {
      logger.error('爬取失败', error);
      process.exit(1);
    }
  });

program
  .command('upload')
  .description('仅上传待处理案例')
  .option('--api-url <url>', 'API基础URL', config.API_BASE)
  .option('--username <user>', '测试用户用户名', config.CREDENTIALS.username)
  .option('--password <pass>', '测试用户密码', config.CREDENTIALS.password)
  .action(async (options) => {
    updateConfig(options);
    logger.info('开始上传案例...');
    try {
      const result = await uploader.run();
      if (result) {
        logger.success('案例上传成功:', result.title);
      } else {
        logger.info('没有待上传的案例');
      }
      process.exit(0);
    } catch (error) {
      logger.error('上传失败', error);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('列出待处理和已处理的案例')
  .action(() => {
    const pending = storage.getCases();
    const uploaded = storage.getUploaded();
    
    logger.info('='.repeat(60));
    logger.info('案例队列状态');
    logger.info('='.repeat(60));
    logger.info(`待上传: ${pending.length} 个`);
    logger.info(`已上传: ${uploaded.length} 个`);
    
    if (pending.length > 0) {
      logger.info('\n待上传案例:');
      pending.forEach((c, i) => {
        logger.info(`  ${i + 1}. ${c.title} (${c.caseType})`);
      });
    }
    
    process.exit(0);
  });

program
  .command('clear')
  .description('清空待处理队列')
  .option('--force', '强制清空，不提示')
  .action((options) => {
    if (!options.force) {
      const pending = storage.getCases();
      logger.warn(`此操作将删除 ${pending.length} 个待上传案例`);
      logger.warn('使用 --force 参数确认执行');
      process.exit(1);
    }
    
    storage.clearCases();
    logger.success('待处理队列已清空');
    process.exit(0);
  });

program
  .command('config')
  .description('显示当前配置')
  .action(() => {
    logger.info('='.repeat(60));
    logger.info('当前配置');
    logger.info('='.repeat(60));
    logger.info(`API URL: ${config.API_BASE}`);
    logger.info(`测试用户: ${config.CREDENTIALS.username}`);
    logger.info(`管理员用户: ${config.ADMIN_CREDENTIALS.username}`);
    logger.info(`请求延迟: ${config.REQUEST_DELAY}ms`);
    logger.info(`最大重试: ${config.MAX_RETRIES}次`);
    logger.info(`存储目录: ${config.STORAGE_DIR}`);
    logger.info(`日志目录: ${config.LOG_DIR}`);
    process.exit(0);
  });

program
  .command('init')
  .description('初始化工作目录')
  .action(() => {
    storage.initDirectories();
    logger.success('工作目录初始化完成');
    process.exit(0);
  });

program.parse(process.argv);

function updateConfig(options) {
  if (options.apiUrl) config.API_BASE = options.apiUrl;
  if (options.username) config.CREDENTIALS.username = options.username;
  if (options.password) config.CREDENTIALS.password = options.password;
  if (options.adminUsername) config.ADMIN_CREDENTIALS.username = options.adminUsername;
  if (options.adminPassword) config.ADMIN_CREDENTIALS.password = options.adminPassword;
}

async function runFullWorkflow() {
  const pendingCases = storage.getCases();
  logger.info(`当前待上传案例: ${pendingCases.length}`);

  if (pendingCases.length === 0) {
    logger.info('队列空，开始爬取新案例...');
    await scraper.run(true);
  }

  logger.info('开始上传...');
  const result = await uploader.run();

  if (result) {
    logger.success('='.repeat(60));
    logger.success('流程完成！');
    logger.success('='.repeat(60));
    logger.success(`案例标题: ${result.title}`);
    logger.success(`案例ID: ${result.caseId}`);
    logger.success(`审核状态: ${result.approved ? '已通过' : '待审核'}`);
  } else {
    logger.info('没有处理任何案例');
  }
}

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
