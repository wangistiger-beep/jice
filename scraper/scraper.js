const axios = require('axios');
const cheerio = require('cheerio');
const config = require('./config');
const logger = require('./logger');
const storage = require('./storage');
const validator = require('./validator');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class Scraper {
  constructor() {
    this.client = axios.create({
      timeout: 15000,
      headers: {
        'User-Agent': config.USER_AGENT
      }
    });
  }

  async fetchHTML(url) {
    try {
      logger.info(`Fetching URL: ${url}`);
      const response = await this.client.get(url);
      logger.success(`Successfully fetched: ${url}`);
      return response.data;
    } catch (error) {
      logger.error(`Failed to fetch: ${url}`, error.message);
      throw error;
    }
  }

  async scrapeDemoCase() {
    logger.info('Generating demo case for testing');
    
    const demoCase = {
      title: '字节跳动 - 短视频平台的成功之道',
      logo: '🎬',
      category: '互联网',
      tags: ['短视频', '社交媒体', '算法推荐', '全球化'],
      caseType: 'success',
      productType: 'B2C',
      profile: {
        companyName: '字节跳动',
        location: '中国 北京',
        coreTech: 'AI算法推荐、短视频技术',
        totalFunding: '数十亿美元',
        investors: '软银、红杉资本等',
        vision: '用科技连接人与信息',
        founded: '2012年'
      },
      success: {
        keyFactors: '1. 精准的算法推荐系统\n2. 全球化战略\n3. 持续的产品创新\n4. 强大的运营能力',
        marketTiming: '抓住了移动互联网和短视频的爆发期',
        productMarketFit: '产品完美匹配用户娱乐需求',
        growthStrategy: '疯狂增长策略+本地化运营',
        scalingSuccess: '从中国成功扩展到全球市场',
        successLessons: '技术驱动产品，数据指导决策，快速迭代试错'
      },
      assessment: {
        marketPotential: '巨大的全球市场需求',
        difficultyAnalysis: '技术门槛高，竞争激烈',
        scalabilityAnalysis: '网络效应强，可快速扩张'
      },
      rebuild: {
        pivotConcept: '从单一产品到多元产品矩阵',
        insight: '用户在不同场景下有不同的内容需求',
        productRefactor: '建立多元化产品生态系统',
        wedge: '以短视频为入口，拓展到其他内容领域'
      },
      execution: {
        techStack: ['机器学习平台', '大数据分析', '微服务架构', 'CDN加速'],
        phase1: 'MVP - 短视频产品验证市场',
        phase2: '验证 - 算法推荐提升用户留存',
        phase3: '扩张 - 全球化布局，本地化运营',
        phase4: '护城河 - 建立技术壁垒和内容生态'
      },
      monetization: {
        revenueStreams: '广告收入 + 直播打赏 + 电商 + 游戏',
        profitAnalysis: '高毛利率，规模效应显著',
        exitLogic: '持续独立运营，寻求海外上市'
      }
    };

    const normalized = validator.normalizeCase(demoCase);
    const validation = validator.validateCase(normalized);

    if (!validation.valid) {
      logger.error('Demo case validation failed', validation.errors);
      return null;
    }

    if (storage.isDuplicate(normalized)) {
      logger.warn('Demo case is duplicate, skipping');
      return null;
    }

    storage.saveCase(normalized);
    logger.success('Demo case generated and saved', { title: normalized.title });
    return normalized;
  }

  async scrapeFromSource(sourceConfig) {
    logger.info(`Starting scrape from source: ${sourceConfig.name}`);

    try {
      await delay(config.REQUEST_DELAY);
      const demoCase = await this.scrapeDemoCase();
      return demoCase;
    } catch (error) {
      logger.error('Scraping failed', error);
      throw error;
    }
  }

  async run() {
    logger.info('='.repeat(60));
    logger.info('CASE SCRAPER STARTED');
    logger.info('='.repeat(60));

    try {
      const demoCase = await this.scrapeDemoCase();
      
      if (demoCase) {
        logger.success('Scraping completed successfully');
        return demoCase;
      } else {
        logger.warn('No new cases scraped');
        return null;
      }
    } catch (error) {
      logger.error('Scraping failed', error);
      throw error;
    }
  }
}

module.exports = new Scraper();
