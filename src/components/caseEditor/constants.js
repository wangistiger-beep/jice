export const defaultCaseData = {
  title: '',
  logo: '📋',
  category: '其他',
  tags: [],
  tag: '',
  caseType: 'failure',
  disclaimer: '',
  productType: '',
  relatedCases: [],
  profitAmount: '',
  lossAmount: '',
  marketPotentialScore: 3,
  potentialScale: 3,
  rebuildPotential: 3,

  profile: {
    companyName: '',
    location: '',
    coreTech: '',
    totalFunding: '',
    investors: '',
    vision: '',
    founded: '',
    closed: '',
    cashBurned: ''
  },

  failure: {
    fatalFlaw: '',
    marketBackground: '',
    economicLogic: '',
    techLimitations: '',
    scalability: '',
    lessonsLearned: ''
  },

  success: {
    successFactor: '',
    marketStrategy: '',
    businessModel: '',
    techInnovation: '',
    growthStrategy: '',
    successLessons: ''
  },

  assessment: {
    marketPotential: '',
    difficultyAnalysis: '',
    scalabilityAnalysis: ''
  },

  rebuild: {
    pivotConcept: '',
    insight: '',
    productRefactor: '',
    wedge: ''
  },

  execution: {
    techStack: '',
    phase1: '',
    phase2: '',
    phase3: '',
    phase4: ''
  },

  monetization: {
    revenueStreams: '',
    profitAnalysis: '',
    exitLogic: ''
  }
};

export const categoryOptions = [
  '软件', '设计', 'AI', '社交', '硬件', '医疗', '出行', '娱乐',
  '电商', '金融', '教育', '清洁科技', '加密货币', '生物科技',
  '物流', '汽车', '共享经济', '互联网', '房地产', '企业服务',
  '本地生活', '内容', '消费', 'SaaS', '食品科技', '其他'
];

export const productTypeOptions = ['SaaS', 'APP', '平台', '硬件', '硬件服务', '医疗设备', '网站', '其他'];

export const logoOptions = [
  { value: '📋', label: '📋 通用' },
  { value: '💰', label: '💰 金融' },
  { value: '🎨', label: '🎨 设计' },
  { value: '🤖', label: '🤖 AI' },
  { value: '🎮', label: '🎮 游戏' },
  { value: '📱', label: '📱 移动' },
  { value: '🖥️', label: '🖥️ 软件' },
  { value: '🏥', label: '🏥 医疗' },
  { value: '🛴', label: '🛴 出行' },
  { value: '🎯', label: '🎯 娱乐' },
  { value: '📝', label: '📝 笔记' },
  { value: '📊', label: '📊 数据' },
  { value: '🛠️', label: '🛠️ 工具' },
  { value: '🚀', label: '🚀 科技' },
  { value: '🧃', label: '🧃 消费' },
  { value: '🩸', label: '🩸 医疗设备' },
  { value: '🪞', label: '🪞 健身' },
  { value: '🌈', label: '🌈 社交' },
  { value: '🤫', label: '🤫 隐私' },
  { value: '⌚', label: '⌚ 可穿戴' }
];

export const steps = [
  { num: 1, label: '档案背景' },
  { num: 2, label: '深度剖析' },
  { num: 3, label: '评估维度' },
  { num: 4, label: '重生策略' },
  { num: 5, label: '执行规划' },
  { num: 6, label: '盈利模型' }
];
