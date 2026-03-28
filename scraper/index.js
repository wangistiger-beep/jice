const logger = require('./logger');
const scraper = require('./scraper');
const uploader = require('./uploader');
const storage = require('./storage');

async function main() {
  logger.info('='.repeat(60));
  logger.info('AUTOMATED CASE SCRAPER & UPLOADER');
  logger.info('='.repeat(60));

  try {
    const pendingCases = storage.getCases();
    logger.info(`Current pending cases in queue: ${pendingCases.length}`);

    if (pendingCases.length === 0) {
      logger.info('No pending cases, scraping new case...');
      await scraper.run();
    }

    logger.info('Starting upload process...');
    const result = await uploader.run();

    if (result) {
      logger.success('='.repeat(60));
      logger.success('PROCESS COMPLETED SUCCESSFULLY');
      logger.success('='.repeat(60));
      logger.success(`Case Title: ${result.title}`);
      logger.success(`Case ID: ${result.caseId}`);
      logger.success(`Approved: ${result.approved ? 'Yes' : 'No (needs manual review)'}`);
    } else {
      logger.info('No cases processed');
    }

    process.exit(0);
  } catch (error) {
    logger.error('Process failed', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
