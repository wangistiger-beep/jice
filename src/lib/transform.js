export function transformCaseToStartup(caseData) {
  let description = caseData.success?.successLessons || caseData.failure?.lessonsLearned || '';

  if (!description || description.trim() === '') {
    if (caseData.profile?.companyName && caseData.profile?.vision) {
      description = `${caseData.profile.companyName} - ${caseData.profile.vision}`;
    } else if (caseData.profile?.companyName) {
      description = `${caseData.profile.companyName}案例分析`;
    } else {
      description = '创业案例深度分析';
    }
  }

  if (description.length > 200) {
    description = description.substring(0, 197) + '...';
  }

  return {
    id: caseData.id,
    name: caseData.title,
    logo: caseData.logo || '📋',
    capital: caseData.profile?.totalFunding || 'N/A',
    profitAmount: caseData.profitAmount || '',
    lossAmount: caseData.lossAmount || '',
    capitalRaw: 0,
    lifespan: caseData.profile?.founded
      ? (caseData.profile.closed
        ? `${new Date(caseData.profile.closed).getFullYear() - new Date(caseData.profile.founded).getFullYear()}年`
        : '进行中')
      : 'N/A',
    lifespanDays: 0,
    founded: caseData.profile?.founded ? parseInt(caseData.profile.founded) : 0,
    died: caseData.profile?.closed ? parseInt(caseData.profile.closed) : 0,
    country: '🇺🇸',
    categories: [caseData.category || '其他'],
    causes: caseData.tags || [],
    description,
    marketPotentialScore: caseData.marketPotentialScore || 3,
    potentialScale: caseData.potentialScale || 3,
    rebuildPotential: caseData.rebuildPotential || 0,
    difficulty: 3,
    scalability: 3,
    caseType: caseData.caseType || 'failure'
  };
}
