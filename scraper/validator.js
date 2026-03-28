const config = require('./config');
const logger = require('./logger');

class Validator {
  validateCase(caseData) {
    const errors = [];

    if (!caseData.title || caseData.title.trim().length < 3) {
      errors.push('标题至少需要3个字符');
    }

    if (!caseData.caseType || !config.CASE_TYPES.includes(caseData.caseType)) {
      errors.push('案例类型必须是 success 或 failure');
    }

    if (!caseData.category || !config.CATEGORIES.includes(caseData.category)) {
      errors.push('请选择有效的分类');
    }

    if (caseData.caseType === 'failure') {
      if (!caseData.failure?.fatalFlaw) {
        errors.push('失败案例需要填写核心问题');
      }
    }

    if (caseData.caseType === 'success') {
      if (!caseData.success?.keyFactors) {
        errors.push('成功案例需要填写关键因素');
      }
    }

    if (!caseData.profile?.companyName) {
      errors.push('公司名称为必填项');
    }

    if (errors.length > 0) {
      logger.warn('Case validation failed', { title: caseData.title, errors });
    } else {
      logger.info('Case validation passed', { title: caseData.title });
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  normalizeCase(caseData) {
    return {
      title: caseData.title?.trim() || '',
      logo: caseData.logo || '📋',
      category: caseData.category || '其他',
      tags: Array.isArray(caseData.tags) ? caseData.tags : [],
      caseType: caseData.caseType || 'failure',
      productType: caseData.productType || 'B2C',
      profile: {
        companyName: caseData.profile?.companyName?.trim() || '',
        location: caseData.profile?.location || '中国',
        coreTech: caseData.profile?.coreTech || '',
        totalFunding: caseData.profile?.totalFunding || '',
        investors: caseData.profile?.investors || '',
        vision: caseData.profile?.vision || '',
        founded: caseData.profile?.founded || '',
        closed: caseData.profile?.closed || '',
        cashBurned: caseData.profile?.cashBurned || ''
      },
      failure: caseData.caseType === 'failure' ? {
        fatalFlaw: caseData.failure?.fatalFlaw || '',
        marketBackground: caseData.failure?.marketBackground || '',
        economicLogic: caseData.failure?.economicLogic || '',
        techLimitations: caseData.failure?.techLimitations || '',
        scalability: caseData.failure?.scalability || '',
        lessonsLearned: caseData.failure?.lessonsLearned || ''
      } : undefined,
      success: caseData.caseType === 'success' ? {
        keyFactors: caseData.success?.keyFactors || '',
        marketTiming: caseData.success?.marketTiming || '',
        productMarketFit: caseData.success?.productMarketFit || '',
        growthStrategy: caseData.success?.growthStrategy || '',
        scalingSuccess: caseData.success?.scalingSuccess || '',
        successLessons: caseData.success?.successLessons || ''
      } : undefined,
      assessment: {
        marketPotential: caseData.assessment?.marketPotential || '',
        difficultyAnalysis: caseData.assessment?.difficultyAnalysis || '',
        scalabilityAnalysis: caseData.assessment?.scalabilityAnalysis || ''
      },
      rebuild: {
        pivotConcept: caseData.rebuild?.pivotConcept || '',
        insight: caseData.rebuild?.insight || '',
        productRefactor: caseData.rebuild?.productRefactor || '',
        wedge: caseData.rebuild?.wedge || ''
      },
      execution: {
        techStack: Array.isArray(caseData.execution?.techStack) ? caseData.execution.techStack : [],
        phase1: caseData.execution?.phase1 || '',
        phase2: caseData.execution?.phase2 || '',
        phase3: caseData.execution?.phase3 || '',
        phase4: caseData.execution?.phase4 || ''
      },
      monetization: {
        revenueStreams: caseData.monetization?.revenueStreams || '',
        profitAnalysis: caseData.monetization?.profitAnalysis || '',
        exitLogic: caseData.monetization?.exitLogic || ''
      }
    };
  }
}

module.exports = new Validator();
