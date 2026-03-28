const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('批量创建20个完整案例');
console.log('='.repeat(60));
console.log('');

const dbPath = path.join(__dirname, '..', 'backend', 'data', 'db.json');

console.log('📚 步骤1: 读取数据库');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
console.log('当前案例数:', db.cases.length);

const currentMaxId = Math.max(...db.cases.map(c => c.id));
console.log('当前最大ID:', currentMaxId);

console.log('');
console.log('✅ 步骤2: 创建20个完整案例');

const cases = [
  {
    id: 7,
    title: '阿里巴巴 - 电商帝国的崛起',
    logo: '🛒',
    category: '电商',
    tags: ['电子商务', 'B2B', '淘宝', '支付宝', '跨境电商'],
    caseType: 'success',
    productType: '平台',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: '阿里巴巴集团',
      location: '中国 杭州',
      coreTech: '电子商务平台、支付系统、云服务、大数据分析',
      totalFunding: '软银投资2000万美元，后多轮融资',
      investors: '软银、雅虎、高盛',
      vision: '让天下没有难做的生意',
      founded: '1999',
      closed: '',
      cashBurned: ''
    },
    success: {
      successFactor: '1. 抓住中国互联网早期电商机遇\n2. B2B切入，C2C扩展，生态化布局\n3. 支付宝解决信任问题\n4. 阿里云构建技术护城河\n5. 双十一创造购物节营销奇迹',
      marketStrategy: '从中小企业B2B切入，逐步扩展到C2C（淘宝）、B2C（天猫）；通过支付宝建立信任；农村包围城市，从中国制造到全球卖',
      businessModel: 'B2B会员费 + C2C/B2C佣金 + 支付宝手续费 + 阿里云服务 + 广告 + 金融科技',
      techInnovation: '1. 淘宝去中心化电商平台\n2. 支付宝担保交易创新\n3. 阿里云自主研发云计算技术\n4. 双十一大促技术架构\n5. 菜鸟物流智能调度',
      growthStrategy: '1. 从B2B到C2C再到B2C的演进\n2. 支付宝独立发展，构建金融生态\n3. 阿里云技术输出\n4. 投资并购完善生态（高德、优酷、饿了么等）\n5. 全球化布局',
      successLessons: '1. 信任是电商的核心\n2. 生态化布局的重要性\n3. 技术是长期竞争力\n4. 营销创造需求（双十一）\n5. 持续创新，不断进化'
    },
    assessment: {
      marketPotential: '中国及全球电商市场巨大，从实物到服务的边界不断扩展',
      difficultyAnalysis: '需要解决信任、支付、物流三大难题，需要持续的技术投入',
      scalabilityAnalysis: '平台网络效应强，但物流等重资产部分边际成本高'
    },
    rebuild: {
      pivotConcept: '从信息平台到交易平台再到数字经济基础设施',
      insight: '中小企业不仅需要信息，更需要交易、支付、物流、金融的一站式服务',
      productRefactor: '从B2B黄页，到淘宝C2C交易平台，再到天猫B2C品牌平台，最终成为数字经济生态',
      wedge: '以B2B信息服务为切入点，逐步建立信任和生态'
    },
    execution: {
      techStack: 'Java后端架构、阿里云基础设施、大数据平台、支付系统',
      phase1: 'MVP - B2B信息平台，帮助中国供应商对接海外买家',
      phase2: '验证 - 淘宝C2C平台 + 支付宝解决信任问题',
      phase3: '扩张 - 天猫B2C + 阿里云技术输出 + 投资并购',
      phase4: '护城河 - 构建数字经济生态（电商、支付、物流、云、金融）'
    },
    monetization: {
      revenueStreams: '1. 电商佣金（淘宝/天猫）\n2. 广告收入（直通车等）\n3. 支付宝/蚂蚁金服\n4. 阿里云服务\n5. 菜鸟物流\n6. 投资收益',
      profitAnalysis: '广告和佣金业务毛利率高；阿里云逐步实现规模化盈利；2023年营收约8000亿人民币',
      exitLogic: '2007年香港上市，2014年纽约上市，成为全球最大IPO之一，市值最高超过8000亿美元'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 8,
    title: '字节跳动 - 短视频帝国',
    logo: '📱',
    category: '互联网',
    tags: ['短视频', '抖音', 'TikTok', '算法推荐', '全球化'],
    caseType: 'success',
    productType: '应用',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: '字节跳动',
      location: '中国 北京',
      coreTech: '算法推荐、短视频、人工智能、大数据',
      totalFunding: '多轮融资，估值超过4000亿美元',
      investors: '红杉、软银、KPCB',
      vision: '用人工智能重新定义信息分发',
      founded: '2012',
      closed: '',
      cashBurned: ''
    },
    success: {
      successFactor: '1. 算法推荐技术领先\n2. 从今日头条到抖音的产品演进\n3. 全球化成功（TikTok）\n4. 短视频赛道卡位精准\n5. 持续的产品创新',
      marketStrategy: '从图文信息（今日头条）切入，利用算法推荐建立优势，再扩展到短视频（抖音），最后全球化（TikTok）',
      businessModel: '广告收入 + 直播打赏 + 电商佣金 + 游戏',
      techInnovation: '1. 推荐算法持续优化\n2. 短视频拍摄和编辑工具\n3. 全球化多语言支持\n4. 直播技术\n5. 大数据处理能力',
      growthStrategy: '1. 算法推荐建立壁垒\n2. 从图文到视频的演进\n3. 出海战略成功\n4. 生态化布局（电商、游戏、教育等）',
      successLessons: '1. 算法是信息分发的核心\n2. 移动互联网的视频化趋势\n3. 全球化的重要性\n4. 持续产品迭代\n5. 技术驱动产品'
    },
    assessment: {
      marketPotential: '短视频和信息分发是巨大市场，还有全球化和元宇宙等机会',
      difficultyAnalysis: '算法技术壁垒高，监管风险大，内容审核成本高',
      scalabilityAnalysis: '算法推荐规模效应强，但内容和监管成本随规模上升'
    },
    rebuild: {
      pivotConcept: '从信息分发到内容生态平台',
      insight: '用户不仅需要图文信息，更需要视频、直播、互动等富媒体体验',
      productRefactor: '从今日头条图文推荐，到抖音短视频，再到直播电商，最终成为内容生态',
      wedge: '以算法推荐为核心，从图文切入'
    },
    execution: {
      techStack: 'Python/Go后端、机器学习平台、大数据处理、CDN加速',
      phase1: 'MVP - 今日头条，图文信息推荐',
      phase2: '验证 - 抖音短视频，验证视频推荐',
      phase3: '扩张 - TikTok全球化，验证国际化',
      phase4: '护城河 - 内容生态（直播、电商、游戏、教育）'
    },
    monetization: {
      revenueStreams: '1. 信息流广告\n2. 短视频广告\n3. 直播打赏\n4. 电商佣金\n5. 游戏收入\n6. 其他增值服务',
      profitAnalysis: '广告业务毛利率高；2023年营收超过800亿美元，成为全球最有价值的独角兽',
      exitLogic: '未上市，估值超过4000亿美元，是全球最大的独角兽公司'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 9,
    title: '美团 - 本地生活服务之王',
    logo: '🏪',
    category: '本地生活',
    tags: ['外卖', '团购', '到店', '酒旅', '即时配送'],
    caseType: 'success',
    productType: '应用',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: '美团',
      location: '中国 北京',
      coreTech: '即时配送调度、地推铁军、大数据分析',
      totalFunding: '多轮融资，腾讯等战略投资',
      investors: '腾讯、红杉、阿里巴巴',
      vision: '帮大家吃得更好，生活更好',
      founded: '2010',
      closed: '',
      cashBurned: ''
    },
    success: {
      successFactor: '1. 千团大战中胜出\n2. 地推铁军执行力强\n3. 外卖+到店+酒旅协同\n4. 即时配送网络\n5. 腾讯生态支持',
      marketStrategy: '从团购切入，到外卖建立壁垒，再到店、酒旅、闪购等多品类扩展，构建本地生活生态',
      businessModel: '外卖佣金 + 到店佣金 + 酒旅佣金 + 配送费 + 广告 + 供应链服务',
      techInnovation: '1. 即时配送调度算法\n2. 地推管理系统\n3. 商家SaaS工具\n4. 大数据分析平台\n5. 无人配送探索',
      growthStrategy: '1. 千团大战中通过执行力取胜\n2. 外卖建立高频刚需\n3. 到店和酒旅变现\n4. 闪购等新品类扩展\n5. 供应链服务',
      successLessons: '1. 地推执行力是O2O关键\n2. 高频打低频\n3. 本地生活需要多品类协同\n4. 配送网络是壁垒\n5. 巨头生态支持很重要'
    },
    assessment: {
      marketPotential: '本地生活服务市场巨大，从餐饮到零售、服务的边界不断扩展',
      difficultyAnalysis: '地推成本高，配送成本高，竞争激烈，需要持续补贴',
      scalabilityAnalysis: '规模效应明显，但配送边际成本下降较慢'
    },
    rebuild: {
      pivotConcept: '从团购平台到本地生活服务基础设施',
      insight: '用户不仅需要团购，更需要外卖、到店、酒旅、零售等一站式本地生活服务',
      productRefactor: '从团购，到外卖，再到店、酒旅、闪购，最终成为本地生活生态',
      wedge: '以团购为切入点，外卖建立高频刚需'
    },
    execution: {
      techStack: 'Java/Go后端、即时配送调度系统、地推管理工具、大数据平台',
      phase1: 'MVP - 团购平台，千团大战',
      phase2: '验证 - 外卖业务，验证即时配送',
      phase3: '扩张 - 到店+酒旅+闪购多品类',
      phase4: '护城河 - 本地生活生态'
    },
    monetization: {
      revenueStreams: '1. 外卖佣金\n2. 到店佣金\n3. 酒旅佣金\n4. 配送费\n5. 广告\n6. 供应链服务',
      profitAnalysis: '佣金收入稳定增长，配送效率提升；2023年营收超过2500亿人民币，实现盈利',
      exitLogic: '2018年香港上市，市值最高超过2万亿港元'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 10,
    title: 'Theranos - 滴血成金的骗局',
    logo: '💉',
    category: '医疗',
    tags: ['医疗科技', '血液检测', '硅谷', '骗局', 'SEC'],
    caseType: 'failure',
    productType: '硬件',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: 'Theranos',
      location: '美国 硅谷',
      coreTech: '微型血液检测技术（声称）',
      totalFunding: '超过9亿美元',
      investors: '默多克、沃尔顿家族、甲骨文创始人',
      vision: '用一滴血改变医疗检测',
      founded: '2003',
      closed: '2018',
      cashBurned: '9亿美元+'
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
      marketPotential: '血液检测市场巨大，痛点真实存在',
      difficultyAnalysis: '医疗技术研发难度大，监管要求高',
      scalabilityAnalysis: '一旦技术验证通过，规模效应强'
    },
    rebuild: {
      pivotConcept: '从革命式创新到渐进式改进',
      insight: '医疗技术需要严谨的科学验证，不能急于求成',
      productRefactor: '先从简单检测项目做起，逐步验证技术，再扩展到更多项目',
      wedge: '选择一两个检测项目进行严谨验证'
    },
    execution: {
      techStack: '实验室设备、医学检验技术',
      phase1: 'MVP - 选择1-2个检测项目，严谨验证',
      phase2: '验证 - 通过FDA审批，建立可信度',
      phase3: '扩张 - 逐步增加检测项目',
      phase4: '护城河 - 建立技术和监管壁垒'
    },
    monetization: {
      revenueStreams: '1. 检测服务收费\n2. 设备销售\n3. 专利授权',
      profitAnalysis: '检测服务利润率高，但需要先通过监管审批',
      exitLogic: '如果技术验证通过，可能被大型医疗公司收购'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 11,
    title: 'FTX - 加密货币帝国的崩塌',
    logo: '💎',
    category: '金融',
    tags: ['加密货币', '交易所', '破产', '欺诈', '监管'],
    caseType: 'failure',
    productType: '平台',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: 'FTX',
      location: '巴哈马',
      coreTech: '加密货币交易所技术',
      totalFunding: '超过20亿美元',
      investors: '红杉、软银、淡马锡',
      vision: '成为全球领先的加密货币交易所',
      founded: '2019',
      closed: '2022',
      cashBurned: '数十亿美元'
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
      marketPotential: '加密货币交易市场存在，但监管风险高',
      difficultyAnalysis: '监管不确定性高，需要极强的风控',
      scalabilityAnalysis: '交易所规模效应强，但需要极强的合规能力'
    },
    rebuild: {
      pivotConcept: '从激进扩张到合规经营',
      insight: '金融企业需要把合规和风控放在首位',
      productRefactor: '建立严格的风控和合规体系，用户资产隔离，透明运营',
      wedge: '合规和风控'
    },
    execution: {
      techStack: '交易所系统、冷钱包存储、风控系统',
      phase1: 'MVP - 建立合规框架，用户资产隔离',
      phase2: '验证 - 透明运营，定期审计',
      phase3: '扩张 - 在合规前提下稳步发展',
      phase4: '护城河 - 建立监管和风控壁垒'
    },
    monetization: {
      revenueStreams: '1. 交易手续费\n2. 上币费\n3. 其他增值服务',
      profitAnalysis: '交易所手续费收入稳定，但需要风控成本',
      exitLogic: '如果合规运营，可能被收购或上市'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 12,
    title: 'WeWork - 共享办公泡沫',
    logo: '🏢',
    category: '房地产',
    tags: ['共享办公', '软银', 'IPO失败', '估值泡沫', '治理问题'],
    caseType: 'failure',
    productType: '服务',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: 'WeWork',
      location: '美国 纽约',
      coreTech: '共享办公空间运营',
      totalFunding: '超过200亿美元',
      investors: '软银愿景基金',
      vision: '打造空间即服务平台',
      founded: '2010',
      closed: '',
      cashBurned: '数十亿美元'
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
      marketPotential: '灵活办公需求真实存在',
      difficultyAnalysis: '重资产模式，资金需求大，需要平衡扩张和盈利',
      scalabilityAnalysis: '规模效应有限，边际成本下降慢'
    },
    rebuild: {
      pivotConcept: '从科技公司到房地产服务公司',
      insight: '共享办公本质是房地产服务，需要谨慎的财务纪律',
      productRefactor: '放缓扩张速度，专注于盈利能力和运营效率',
      wedge: '优质地段和运营效率'
    },
    execution: {
      techStack: '空间管理系统、会员系统',
      phase1: 'MVP - 在核心城市验证模式',
      phase2: '验证 - 实现单体盈利',
      phase3: '扩张 - 在盈利前提下稳步扩张',
      phase4: '护城河 - 建立品牌和运营壁垒'
    },
    monetization: {
      revenueStreams: '1. 会员费\n2. 场地租赁\n3. 增值服务',
      profitAnalysis: '需要控制租金成本和扩张速度，才能实现盈利',
      exitLogic: '如果实现可持续盈利，可能被收购或重新上市'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 13,
    title: '京东 - 电商自营之路',
    logo: '📦',
    category: '电商',
    tags: ['自营电商', '物流', '3C数码', '京东物流', '品质电商'],
    caseType: 'success',
    productType: '平台',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: '京东集团',
      location: '中国 北京',
      coreTech: '自营电商、物流体系、供应链管理',
      totalFunding: '多轮融资，腾讯战略投资',
      investors: '腾讯、红杉、高瓴',
      vision: '成为全球最值得信赖的企业',
      founded: '1998',
      closed: '',
      cashBurned: ''
    },
    success: {
      successFactor: '1. 坚持自营，建立品质信任\n2. 自建物流，提升用户体验\n3. 3C数码切入口碑\n4. 腾讯生态支持\n5. 供应链管理能力强',
      marketStrategy: '从3C数码自营切入，建立品质和物流优势，再扩展到全品类，与淘宝天猫形成差异化',
      businessModel: '自营销售收入 + 第三方平台佣金 + 物流服务 + 广告 + 金融科技',
      techInnovation: '1. 自营供应链管理\n2. 自建物流仓储体系\n3. 配送调度系统\n4. 品质控制体系\n5. 无人仓库/配送探索',
      growthStrategy: '1. 3C数码建立口碑\n2. 自建物流建立壁垒\n3. 全品类扩展\n4. 京东物流独立发展\n5. 技术输出',
      successLessons: '1. 品质信任是电商的另一核心\n2. 物流体验是差异化竞争点\n3. 自营和平台可以结合\n4. 重资产也能建立壁垒\n5. 差异化竞争很重要'
    },
    assessment: {
      marketPotential: '品质电商和即时配送市场巨大',
      difficultyAnalysis: '自建物流成本高，需要巨大投入',
      scalabilityAnalysis: '物流网络规模效应强，但需要时间和资本'
    },
    rebuild: {
      pivotConcept: '从3C数码零售商到品质电商平台',
      insight: '用户不仅需要低价，更需要品质、正品、快速配送',
      productRefactor: '从3C数码自营，到全品类自营，再到开放平台+物流服务',
      wedge: '3C数码正品 + 快速配送'
    },
    execution: {
      techStack: '供应链管理系统、WMS仓储系统、TMS运输系统、大数据分析',
      phase1: 'MVP - 3C数码自营，建立信任',
      phase2: '验证 - 自建物流，验证配送体验',
      phase3: '扩张 - 全品类扩展 + 开放平台',
      phase4: '护城河 - 品质电商 + 物流网络'
    },
    monetization: {
      revenueStreams: '1. 自营销售收入\n2. 第三方平台佣金\n3. 物流服务\n4. 广告\n5. 金融科技',
      profitAnalysis: '自营利润率较低，物流需要规模效应；2023年营收超过1万亿人民币，实现盈利',
      exitLogic: '2014年纳斯达克上市，2020年香港二次上市，市值最高超过1万亿港元'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 14,
    title: '拼多多 - 社交电商奇迹',
    logo: '🛍️',
    category: '电商',
    tags: ['社交电商', '拼团', '下沉市场', '农业', '性价比'],
    caseType: 'success',
    productType: '应用',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: '拼多多',
      location: '中国 上海',
      coreTech: '社交拼团、算法推荐、农业供应链',
      totalFunding: '多轮融资，腾讯等投资',
      investors: '腾讯、红杉、高瓴',
      vision: '多实惠，多乐趣',
      founded: '2015',
      closed: '',
      cashBurned: ''
    },
    success: {
      successFactor: '1. 抓住下沉市场机遇\n2. 社交拼团创新获客\n3. 农业供应链切入\n4. 算法推荐精准\n5. 腾讯生态支持',
      marketStrategy: '从下沉市场和农业切入，通过社交拼团低成本获客，与淘宝京东形成差异化，再向上渗透',
      businessModel: '交易佣金 + 广告 + 品牌推广 + 农业供应链服务',
      techInnovation: '1. 社交拼团机制\n2. 算法推荐精准匹配\n3. 农产品上行供应链\n4. 百亿补贴营销\n5. 多多买菜社区团购',
      growthStrategy: '1. 社交拼团低成本获客\n2. 农产品建立差异化\n3. 百亿补贴向上渗透\n4. 多多买菜扩展\n5. 品牌升级',
      successLessons: '1. 下沉市场依然有巨大机会\n2. 社交裂变是低成本获客方式\n3. 差异化竞争很重要\n4. 农产品是电商蓝海\n5. 后来者可以弯道超车'
    },
    assessment: {
      marketPotential: '下沉市场和农产品电商巨大',
      difficultyAnalysis: '需要解决信任问题，品牌形象升级难',
      scalabilityAnalysis: '社交裂变规模效应强，算法推荐边际成本低'
    },
    rebuild: {
      pivotConcept: '从淘宝特卖版到社交电商平台',
      insight: '下沉市场用户不仅需要便宜，还需要社交乐趣和真实惠',
      productRefactor: '从拼团游戏，到农产品电商，再到全品类平台，最终到品质升级',
      wedge: '社交拼团 + 农产品'
    },
    execution: {
      techStack: '社交拼团系统、算法推荐、供应链管理',
      phase1: 'MVP - 拼团游戏，验证社交裂变',
      phase2: '验证 - 农产品上行，验证供应链',
      phase3: '扩张 - 全品类 + 百亿补贴',
      phase4: '护城河 - 社交电商 + 农业供应链'
    },
    monetization: {
      revenueStreams: '1. 交易佣金\n2. 广告\n3. 品牌推广\n4. 多多买菜\n5. 农业服务',
      profitAnalysis: '佣金和广告收入增长快；2023年营收超过2300亿人民币，实现盈利',
      exitLogic: '2018年纳斯达克上市，市值最高超过2000亿美元'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 15,
    title: '小米 - 性价比之王',
    logo: '📱',
    category: '智能硬件',
    tags: ['智能手机', '性价比', 'MIUI', '生态链', 'IoT'],
    caseType: 'success',
    productType: '硬件',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: '小米集团',
      location: '中国 北京',
      coreTech: '智能手机、MIUI、生态链、IoT',
      totalFunding: '多轮融资',
      investors: '晨兴、启明、IDG',
      vision: '让全球每个人都能享受科技带来的美好生活',
      founded: '2010',
      closed: '',
      cashBurned: ''
    },
    success: {
      successFactor: '1. 性价比切入智能手机市场\n2. MIUI用户体验优秀\n3. 互联网模式做硬件\n4. 生态链布局IoT\n5. 粉丝社区运营',
      marketStrategy: '从MIUI系统切入，积累用户，再推出小米手机，性价比建立口碑，再生态链布局IoT',
      businessModel: '硬件微利 + 互联网服务 + IoT生态 + 新零售',
      techInnovation: '1. MIUI系统快速迭代\n2. 高性价比硬件设计\n3. 生态链投资模式\n4. IoT互联互通\n5. 线上线下新零售',
      growthStrategy: '1. MIUI积累用户\n2. 小米手机建立品牌\n3. 生态链布局IoT\n4. 国际化扩张\n5. 汽车等新业务',
      successLessons: '1. 性价比是核武器\n2. 软件硬件服务结合\n3. 生态链模式创新\n4. 粉丝社区很重要\n5. 用互联网思维做硬件'
    },
    assessment: {
      marketPotential: '智能手机和IoT市场巨大',
      difficultyAnalysis: '硬件竞争激烈，需要持续研发投入',
      scalabilityAnalysis: '硬件规模效应强，生态协同效应明显'
    },
    rebuild: {
      pivotConcept: '从手机公司到科技生态公司',
      insight: '用户不仅需要手机，更需要完整的智能生活体验',
      productRefactor: '从MIUI，到小米手机，再到生态链IoT，最终成为科技生态',
      wedge: 'MIUI + 高性价比手机'
    },
    execution: {
      techStack: 'Android系统定制、硬件设计、IoT连接、电商平台',
      phase1: 'MVP - MIUI系统，积累用户',
      phase2: '验证 - 小米手机，验证性价比',
      phase3: '扩张 - 生态链布局 + 国际化',
      phase4: '护城河 - 科技生态'
    },
    monetization: {
      revenueStreams: '1. 智能手机\n2. IoT硬件\n3. 互联网服务\n4. 新零售\n5. 新业务',
      profitAnalysis: '硬件微利，互联网服务利润率高；2023年营收超过2800亿人民币',
      exitLogic: '2018年香港上市，市值最高超过8000亿港元'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 16,
    title: 'Ofo小黄车 - 共享经济泡沫',
    logo: '🚲',
    category: '出行',
    tags: ['共享单车', '共享经济', '押金危机', '资金链断裂', '恶性竞争'],
    caseType: 'failure',
    productType: '硬件',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: 'Ofo',
      location: '中国 北京',
      coreTech: '共享单车运营、智能锁',
      totalFunding: '超过20亿美元',
      investors: '滴滴、阿里、红杉、经纬',
      vision: '用单车连接城市',
      founded: '2014',
      closed: '2019',
      cashBurned: '数十亿美元'
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
      marketPotential: '短途出行需求真实存在',
      difficultyAnalysis: '重资产、高损耗、恶性竞争',
      scalabilityAnalysis: '规模效应有限，边际成本下降慢'
    },
    rebuild: {
      pivotConcept: '从快速扩张到精细化运营',
      insight: '共享单车需要精细化运营，不能只靠烧钱',
      productRefactor: '放缓扩张速度，专注于运营效率、车辆维护、成本控制',
      wedge: '运营效率和车辆质量'
    },
    execution: {
      techStack: '智能锁、调度系统、车辆管理',
      phase1: 'MVP - 在校园验证模式',
      phase2: '验证 - 实现单体盈利',
      phase3: '扩张 - 在盈利前提下扩张',
      phase4: '护城河 - 建立运营壁垒'
    },
    monetization: {
      revenueStreams: '1. 骑行费\n2. 广告\n3. 其他增值服务',
      profitAnalysis: '需要控制车辆损耗和运营成本，才能盈利',
      exitLogic: '如果实现可持续运营，可能被收购'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 17,
    title: 'Luckin瑞幸咖啡 - 从造假到重生',
    logo: '☕',
    category: '消费',
    tags: ['咖啡', '新零售', '财务造假', '退市', '重生'],
    caseType: 'failure',
    productType: '服务',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: '瑞幸咖啡',
      location: '中国 厦门',
      coreTech: '咖啡新零售、APP运营',
      totalFunding: '多轮融资，IPO融资',
      investors: '愉悦资本、大钲资本、GIC',
      vision: '成为中国人的咖啡',
      founded: '2017',
      closed: '',
      cashBurned: '数十亿美元'
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
      marketPotential: '中国咖啡市场巨大',
      difficultyAnalysis: '需要平衡扩张和盈利，星巴克竞争',
      scalabilityAnalysis: '规模效应明显，但需要供应链能力'
    },
    rebuild: {
      pivotConcept: '从资本驱动到业务驱动',
      insight: '咖啡生意需要回归商业本质，不能只靠烧钱和造假',
      productRefactor: '财务造假曝光后，更换管理层，聚焦盈利，关店止损，优化供应链',
      wedge: '产品和供应链'
    },
    execution: {
      techStack: 'APP系统、供应链管理、门店运营',
      phase1: 'MVP - 验证咖啡需求',
      phase2: '验证 - 实现单店盈利',
      phase3: '扩张 - 在盈利前提下扩张',
      phase4: '护城河 - 建立品牌和供应链壁垒'
    },
    monetization: {
      revenueStreams: '1. 咖啡销售\n2. 周边产品\n3. 加盟',
      profitAnalysis: '需要控制门店成本和补贴，才能盈利',
      exitLogic: '退市后如果实现盈利，可能重新上市或被收购'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 18,
    title: '网易 - 游戏与教育的平衡',
    logo: '📧',
    category: '互联网',
    tags: ['游戏', '邮箱', '网易云音乐', '教育', '电商'],
    caseType: 'success',
    productType: '应用',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: '网易',
      location: '中国 杭州',
      coreTech: '游戏、邮箱、在线教育、音乐',
      totalFunding: '早期融资后上市',
      investors: '早期机构投资者',
      vision: '网聚人的力量',
      founded: '1997',
      closed: '',
      cashBurned: ''
    },
    success: {
      successFactor: '1. 邮箱业务建立根基\n2. 游戏业务现金流\n3. 产品打磨能力强\n4. 多元化布局\n5. 稳健经营',
      marketStrategy: '从邮箱切入，建立用户基础，再扩展到游戏、音乐、教育、电商等，多元化布局',
      businessModel: '游戏收入 + 邮箱服务 + 在线教育 + 音乐会员 + 电商 + 广告',
      techInnovation: '1. 邮箱技术\n2. 游戏自研能力\n3. 网易云音乐推荐\n4. 在线教育\n5. 电商运营',
      growthStrategy: '1. 邮箱建立用户\n2. 游戏成为现金牛\n3. 音乐/教育/电商多元化\n4. 游戏出海\n5. 稳健发展',
      successLessons: '1. 产品打磨很重要\n2. 现金流业务是基础\n3. 多元化可以抗风险\n4. 稳健经营不易犯错\n5. 游戏是好生意'
    },
    assessment: {
      marketPotential: '游戏、音乐、教育市场都很大',
      difficultyAnalysis: '需要多个业务线同时成功，多元化管理难',
      scalabilityAnalysis: '游戏规模效应强，多元化抗风险'
    },
    rebuild: {
      pivotConcept: '从门户到多元化科技公司',
      insight: '用户有多样需求，单一业务有风险',
      productRefactor: '从邮箱，到游戏，再到音乐、教育、电商，最终成为多元化公司',
      wedge: '邮箱 + 游戏'
    },
    execution: {
      techStack: '邮件系统、游戏引擎、音乐推荐、教育系统',
      phase1: 'MVP - 邮箱业务，建立用户',
      phase2: '验证 - 游戏业务，验证现金流',
      phase3: '扩张 - 音乐/教育/电商多元化',
      phase4: '护城河 - 多元化布局'
    },
    monetization: {
      revenueStreams: '1. 游戏\n2. 在线教育\n3. 音乐会员\n4. 邮箱服务\n5. 电商\n6. 广告',
      profitAnalysis: '游戏利润率高，教育和音乐增长快；2023年营收超过2500亿人民币',
      exitLogic: '2000年纳斯达克上市，2020年香港二次上市，市值最高超过8000亿港元'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 19,
    title: '百度 - 搜索巨头的转型',
    logo: '🔍',
    category: '互联网',
    tags: ['搜索', 'AI', '自动驾驶', '广告', 'All in AI'],
    caseType: 'success',
    productType: '平台',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: '百度',
      location: '中国 北京',
      coreTech: '搜索引擎、AI、自动驾驶',
      totalFunding: '早期融资后上市',
      investors: '德丰杰、IDG',
      vision: '用科技让复杂的世界更简单',
      founded: '2000',
      closed: '',
      cashBurned: ''
    },
    success: {
      successFactor: '1. 搜索技术领先\n2. 广告变现模式成熟\n3. 技术基因强\n4. AI提前布局\n5. 自动驾驶探索',
      marketStrategy: '从搜索切入，建立技术壁垒，广告变现，再布局AI和自动驾驶，寻求第二增长曲线',
      businessModel: '搜索广告 + AI服务 + 自动驾驶 + 云服务 + 其他',
      techInnovation: '1. 中文搜索技术\n2. 百度广告系统\n3. AI技术（飞桨、文心一言）\n4. 自动驾驶（Apollo）\n5. 百度云',
      growthStrategy: '1. 搜索建立壁垒\n2. 广告变现\n3. AI布局\n4. 自动驾驶探索\n5. 寻找第二曲线',
      successLessons: '1. 技术壁垒很重要\n2. 搜索广告是好生意\n3. AI需要提前布局\n4. 第二曲线难找\n5. 技术基因有优势'
    },
    assessment: {
      marketPotential: '搜索、AI、自动驾驶市场巨大',
      difficultyAnalysis: '搜索竞争激烈，AI和自动驾驶投入大',
      scalabilityAnalysis: '搜索和AI规模效应强，但自动驾驶需要时间'
    },
    rebuild: {
      pivotConcept: '从搜索公司到AI公司',
      insight: '搜索之后，AI是更大的机会',
      productRefactor: '从搜索，到广告，再到AI和自动驾驶，最终成为AI公司',
      wedge: '搜索技术 + AI'
    },
    execution: {
      techStack: '搜索引擎、广告系统、AI框架、自动驾驶',
      phase1: 'MVP - 中文搜索，验证技术',
      phase2: '验证 - 广告变现，验证模式',
      phase3: '扩张 - AI布局，探索自动驾驶',
      phase4: '护城河 - 建立AI壁垒'
    },
    monetization: {
      revenueStreams: '1. 搜索广告\n2. AI服务\n3. 云服务\n4. 自动驾驶\n5. 其他',
      profitAnalysis: '广告利润率高，AI需要投入；2023年营收超过1300亿人民币',
      exitLogic: '2005年纳斯达克上市，2024年香港二次上市，市值最高超过1000亿美元'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 20,
    title: 'B站 - 年轻人的社区',
    logo: '📺',
    category: '内容',
    tags: ['视频', '弹幕', 'ACG', '社区', 'UP主'],
    caseType: 'success',
    productType: '平台',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: '哔哩哔哩',
      location: '中国 上海',
      coreTech: '视频平台、弹幕、社区运营',
      totalFunding: '多轮融资，腾讯阿里投资',
      investors: '腾讯、阿里、索尼',
      vision: 'Z世代的文化社区',
      founded: '2009',
      closed: '',
      cashBurned: ''
    },
    success: {
      successFactor: '1. ACG切入精准\n2. 弹幕文化创新\n3. 社区氛围好\n4. UP主生态\n5. 年轻人定位',
      marketStrategy: '从ACG二次元切入，建立社区氛围和弹幕文化，再扩展到全品类内容，成为年轻人的文化社区',
      businessModel: '游戏收入 + 广告 + 会员 + 直播 + 电商',
      techInnovation: '1. 弹幕技术\n2. 社区运营\n3. UP主生态\n4. 视频推荐\n5. 直播技术',
      growthStrategy: '1. ACG建立社区\n2. 弹幕建立文化\n3. UP主生态\n4. 内容破圈\n5. 多元化变现',
      successLessons: '1. 社区氛围很重要\n2. 弹幕是创新点\n3. 年轻人市场巨大\n4. UP主是核心资产\n5. 垂直切入再破圈'
    },
    assessment: {
      marketPotential: '年轻人内容和社区市场巨大',
      difficultyAnalysis: '需要平衡社区氛围和商业化',
      scalabilityAnalysis: '社区规模效应强，但内容和运营成本高'
    },
    rebuild: {
      pivotConcept: '从ACG社区到年轻人文化平台',
      insight: '年轻人不仅需要ACG，更需要多元内容和社区认同',
      productRefactor: '从ACG，到全品类内容，再到社区生态，最终成为年轻人文化平台',
      wedge: 'ACG + 弹幕社区'
    },
    execution: {
      techStack: '视频平台、弹幕系统、社区运营',
      phase1: 'MVP - ACG社区，验证需求',
      phase2: '验证 - 弹幕文化，建立氛围',
      phase3: '扩张 - 全品类内容 + UP主生态',
      phase4: '护城河 - 年轻人文化社区'
    },
    monetization: {
      revenueStreams: '1. 游戏\n2. 广告\n3. 会员\n4. 直播\n5. 电商',
      profitAnalysis: '游戏利润率高，广告和会员增长快；2023年营收超过220亿人民币',
      exitLogic: '2018年纳斯达克上市，2021年香港二次上市，市值最高超过500亿美元'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 21,
    title: 'Quibi - 短视频流媒体的失败',
    logo: '🎬',
    category: '内容',
    tags: ['短视频', '流媒体', '好莱坞', '付费', '疫情'],
    caseType: 'failure',
    productType: '应用',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: 'Quibi',
      location: '美国 洛杉矶',
      coreTech: '短视频流媒体、Turnstyle技术',
      totalFunding: '超过17亿美元',
      investors: '迪士尼、索尼、NBC环球、华纳',
      vision: '重新定义移动视频',
      founded: '2018',
      closed: '2020',
      cashBurned: '17亿美元+'
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
      marketPotential: '短视频市场巨大，但竞争激烈',
      difficultyAnalysis: '内容成本高，用户习惯难改变，竞争激烈',
      scalabilityAnalysis: '流媒体规模效应强，但内容成本高'
    },
    rebuild: {
      pivotConcept: '从好莱坞自制到内容聚合',
      insight: '用户需要的是短视频，不是移动版好莱坞',
      productRefactor: '放弃自制，改为聚合和用户生成内容，降低成本',
      wedge: '移动短视频'
    },
    execution: {
      techStack: '视频流媒体、CDN、推荐算法',
      phase1: 'MVP - 验证短视频需求',
      phase2: '验证 - 验证付费意愿',
      phase3: '扩张 - 控制成本下扩张',
      phase4: '护城河 - 建立内容或技术壁垒'
    },
    monetization: {
      revenueStreams: '1. 订阅费\n2. 广告\n3. 其他',
      profitAnalysis: '需要控制内容成本，才能盈利',
      exitLogic: '如果调整模式，可能被收购'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 22,
    title: '贝壳找房 - 房产中介平台',
    logo: '🏠',
    category: '房地产',
    tags: ['房产', '中介', '链家', '真房源', 'ACN'],
    caseType: 'success',
    productType: '平台',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: '贝壳找房',
      location: '中国 北京',
      coreTech: '房产平台、真房源、ACN合作网络',
      totalFunding: '多轮融资，腾讯投资',
      investors: '腾讯、红杉、高瓴',
      vision: '为美好生活找房',
      founded: '2017',
      closed: '',
      cashBurned: ''
    },
    success: {
      successFactor: '1. 链家基础好\n2. 真房源建立信任\n3. ACN合作网络\n4. 技术投入大\n5. 腾讯生态支持',
      marketStrategy: '从链家自营切入，建立真房源标准，再通过ACN网络开放给行业，成为房产交易平台',
      businessModel: '交易佣金 + 平台服务费 + 广告 + 金融',
      techInnovation: '1. 真房源系统\n2. ACN合作网络\n3. VR看房\n4. 大数据分析\n5. 经纪人SaaS',
      growthStrategy: '1. 链家建立基础\n2. 真房源建立信任\n3. ACN开放行业\n4. 技术赋能\n5. 多元化服务',
      successLessons: '1. 真房源是房产平台的核心\n2. ACN模式解决合作问题\n3. 线下很重但壁垒高\n4. 技术可以提效\n5. 从自营到平台是路径'
    },
    assessment: {
      marketPotential: '房产交易市场巨大',
      difficultyAnalysis: '线下很重，信任建立难',
      scalabilityAnalysis: '平台网络效应强，但线下扩张慢'
    },
    rebuild: {
      pivotConcept: '从房产中介到房产平台',
      insight: '行业不仅需要好中介，更需要真房源和合作网络',
      productRefactor: '从链家中介，到真房源，再到ACN平台，最终成为房产基础设施',
      wedge: '真房源 + ACN'
    },
    execution: {
      techStack: '真房源系统、ACN系统、VR技术、SaaS工具',
      phase1: 'MVP - 链家中介，验证真房源',
      phase2: '验证 - ACN网络，验证合作',
      phase3: '扩张 - 平台开放 + 技术赋能',
      phase4: '护城河 - 房产交易平台'
    },
    monetization: {
      revenueStreams: '1. 交易佣金\n2. 平台服务费\n3. 广告\n4. 金融\n5. 其他服务',
      profitAnalysis: '佣金收入稳定；2023年营收超过600亿人民币',
      exitLogic: '2020年纽交所上市，2022年香港二次上市，市值最高超过800亿美元'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 23,
    title: 'Dropbox - 云存储的先驱',
    logo: '☁️',
    category: '企业服务',
    tags: ['云存储', 'SaaS', '文件同步', '协作', '企业服务'],
    caseType: 'success',
    productType: '应用',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: 'Dropbox',
      location: '美国 旧金山',
      coreTech: '云存储、文件同步、协作',
      totalFunding: '多轮融资',
      investors: '红杉、Accel、YC',
      vision: '让工作更简单',
      founded: '2007',
      closed: '',
      cashBurned: ''
    },
    success: {
      successFactor: '1. 抓住云存储机遇\n2. 产品体验优秀\n3. 病毒式传播\n4. 从C到B的转型\n5. YC孵化',
      marketStrategy: '从个人云存储切入，建立用户基础，再扩展到企业协作，成为SaaS公司',
      businessModel: '个人订阅 + 企业订阅 + 存储升级',
      techInnovation: '1. 文件同步技术\n2. 多端一致体验\n3. 协作功能\n4. Dropbox Paper\n5. 云存储架构',
      growthStrategy: '1. 个人用户建立口碑\n2. 病毒式传播\n3. 企业转型\n4. 产品矩阵\n5. 国际化',
      successLessons: '1. 产品体验是关键\n2. 免费+付费模式有效\n3. 病毒传播可获客\n4. 从C到B是路径\n5. YC资源很重要'
    },
    assessment: {
      marketPotential: '云存储和协作市场巨大',
      difficultyAnalysis: '竞争激烈（Google Drive、OneDrive），差异化难',
      scalabilityAnalysis: '云存储规模效应强，但存储成本随规模上升'
    },
    rebuild: {
      pivotConcept: '从云存储到协作平台',
      insight: '用户不仅需要存储，更需要协作',
      productRefactor: '从文件存储，到同步，再到协作，最终成为工作平台',
      wedge: '简单的文件同步'
    },
    execution: {
      techStack: '云存储、同步技术、协作系统',
      phase1: 'MVP - 文件同步，验证需求',
      phase2: '验证 - 免费+付费，验证模式',
      phase3: '扩张 - 企业转型 + 协作',
      phase4: '护城河 - 协作平台'
    },
    monetization: {
      revenueStreams: '1. 个人订阅\n2. 企业订阅\n3. 存储升级',
      profitAnalysis: '订阅收入稳定，但竞争激烈；2023年营收超过25亿美元',
      exitLogic: '2018年纳斯达克上市，市值最高超过100亿美元'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 24,
    title: 'Uber - 共享出行的开创者',
    logo: '🚗',
    category: '出行',
    tags: ['共享出行', '网约车', 'UberPOOL', '全球化', '监管'],
    caseType: 'success',
    productType: '应用',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: 'Uber',
      location: '美国 旧金山',
      coreTech: '网约车平台、动态定价、算法调度',
      totalFunding: '超过250亿美元',
      investors: '软银、谷歌、Benchmark',
      vision: '让城市更美好',
      founded: '2009',
      closed: '',
      cashBurned: ''
    },
    success: {
      successFactor: '1. 抓住出行痛点\n2. 动态定价创新\n3. 全球化扩张\n4. 算法调度\n5. 资本支持',
      marketStrategy: '从高端黑车切入，逐步扩展到大众市场，通过全球化快速扩张，最终成为出行平台',
      businessModel: '佣金 + Uber Eats外卖 + 其他出行业务 + 广告',
      techInnovation: '1. 动态定价（Surge）\n2. 算法调度\n3. 多端产品\n4. Uber Eats\n5. 自动驾驶探索',
      growthStrategy: '1. 高端切入\n2. 大众扩展\n3. 全球化\n4. Uber Eats\n5. 寻找盈利',
      successLessons: '1. 出行痛点真实存在\n2. 动态定价是创新\n3. 全球化可以快速扩张\n4. 监管是重要风险\n5. 盈利需要时间'
    },
    assessment: {
      marketPotential: '出行市场巨大，还有外卖等扩展机会',
      difficultyAnalysis: '监管风险高，补贴成本高，竞争激烈',
      scalabilityAnalysis: '平台网络效应强，但补贴和监管成本高'
    },
    rebuild: {
      pivotConcept: '从叫车公司到交通平台',
      insight: '用户不仅需要打车，更需要多元交通和外卖',
      productRefactor: '从高端叫车，到大众打车，再到外卖和多元交通，最终成为交通平台',
      wedge: '叫车服务'
    },
    execution: {
      techStack: '叫车系统、动态定价、调度算法',
      phase1: 'MVP - 高端叫车，验证需求',
      phase2: '验证 - 大众市场，验证模式',
      phase3: '扩张 - 全球化 + Uber Eats',
      phase4: '护城河 - 交通平台'
    },
    monetization: {
      revenueStreams: '1. 打车佣金\n2. Uber Eats\n3. 其他服务\n4. 广告',
      profitAnalysis: '佣金收入增长，但需要控制补贴；2023年营收超过350亿美元，实现盈利',
      exitLogic: '2019年纽交所上市，市值最高超过1200亿美元'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 25,
    title: 'Twitter - 社交媒体的兴衰',
    logo: '🐦',
    category: '社交',
    tags: ['社交媒体', '微博', '信息分发', '马斯克', '收购'],
    caseType: 'success',
    productType: '应用',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: 'Twitter (X)',
      location: '美国 旧金山',
      coreTech: '社交媒体、实时信息流',
      totalFunding: '多轮融资',
      investors: 'Benchmark、Union Square Ventures',
      vision: '全球实时交流平台',
      founded: '2006',
      closed: '',
      cashBurned: ''
    },
    success: {
      successFactor: '1. 抓住实时信息需求\n2. 简洁产品设计\n3. 名人效应\n4. 公共广场定位\n5. 早期创新',
      marketStrategy: '从140字微博切入，建立实时信息平台，通过名人效应和媒体采用，成为公共广场',
      businessModel: '广告 + 数据授权 + 订阅',
      techInnovation: '1. 140字限制\n2. Retweet转发\n3. Hashtag话题\n4. 实时信息流\n5. API生态',
      growthStrategy: '1. 简洁产品\n2. 名人效应\n3. 媒体采用\n4. API生态\n5. 马斯克收购',
      successLessons: '1. 简洁产品有力量\n2. 实时信息有价值\n3. 名人效应重要\n4. 公共广场定位\n5. 产品创新难持续'
    },
    assessment: {
      marketPotential: '社交媒体和实时信息市场巨大',
      difficultyAnalysis: '产品创新难，变现难，治理难',
      scalabilityAnalysis: '社交网络规模效应强，但内容和治理成本高'
    },
    rebuild: {
      pivotConcept: '从社交产品到公共广场',
      insight: '用户不仅需要社交，更需要实时信息和公共讨论',
      productRefactor: '从140字社交，到实时信息，再到公共广场',
      wedge: '140字简洁'
    },
    execution: {
      techStack: '社交媒体、实时信息流',
      phase1: 'MVP - 140字，验证简洁',
      phase2: '验证 - 名人媒体，验证价值',
      phase3: '扩张 - 广告变现 + API',
      phase4: '护城河 - 公共广场'
    },
    monetization: {
      revenueStreams: '1. 广告\n2. 数据授权\n3. 订阅',
      profitAnalysis: '广告收入稳定，但增长慢；2023年马斯克收购前营收约50亿美元',
      exitLogic: '2013年纽交所上市，2022年被马斯克以440亿美元收购退市'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 26,
    title: 'Clubhouse - 语音社交的流星',
    logo: '🎤',
    category: '社交',
    tags: ['语音社交', '直播', '音频', '疫情', '昙花一现'],
    caseType: 'failure',
    productType: '应用',
    status: 'published',
    authorId: 2,
    disclaimer: '本案例仅供学习参考，基于公开信息整理。',
    profile: {
      companyName: 'Clubhouse',
      location: '美国 旧金山',
      coreTech: '语音聊天室、直播',
      totalFunding: '超过3亿美元',
      investors: 'a16z、红杉',
      vision: '语音社交平台',
      founded: '2020',
      closed: '',
      cashBurned: ''
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
      marketPotential: '音频社交有机会，但需要找到正确模式',
      difficultyAnalysis: '用户留存难，内容质量不稳定，竞争激烈',
      scalabilityAnalysis: '网络效应强，但内容质量控制难'
    },
    rebuild: {
      pivotConcept: '从全开放到垂直社区',
      insight: '语音社交需要特定场景和人群，不能大而全',
      productRefactor: '选择垂直领域（如投资、音乐、教育），建立高质量社区',
      wedge: '垂直高质量社区'
    },
    execution: {
      techStack: '语音聊天室、直播',
      phase1: 'MVP - 选择垂直领域验证',
      phase2: '验证 - 验证留存和质量',
      phase3: '扩张 - 控制质量下扩张',
      phase4: '护城河 - 建立社区壁垒'
    },
    monetization: {
      revenueStreams: '1. 订阅\n2. 打赏\n3. 广告',
      profitAnalysis: '需要找到合适的变现方式',
      exitLogic: '如果调整模式，可能被收购'
    },
    reviewerId: 1,
    reviewNotes: '案例内容完整，审核通过',
    reviewedAt: new Date().toISOString(),
    reviewedBy: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

console.log(`创建 ${cases.length} 个案例`);

console.log('');
console.log('💾 步骤3: 添加到数据库');
cases.forEach(c => {
  db.cases.push(c);
  console.log(`  - 添加: [ID:${c.id}] ${c.title}`);
});

db.nextCaseId = 27;

console.log('');
console.log('📝 步骤4: 保存数据库');
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('数据库已保存');

console.log('');
console.log('✅ 步骤5: 验证');
const verifyDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
console.log('最终案例数:', verifyDb.cases.length);

const newIds = cases.map(c => c.id);
const addedCases = verifyDb.cases.filter(c => newIds.includes(c.id));
console.log('成功添加的新案例数:', addedCases.length);

console.log('');
console.log('='.repeat(60));
console.log('✅ 20个完整案例批量创建成功！');
console.log('='.repeat(60));
console.log('');
console.log('新增案例列表:');
addedCases.forEach((c, index) => {
  console.log(`  ${index + 1}. [ID:${c.id}] ${c.title} - ${c.caseType === 'success' ? '成功' : '失败'}案例`);
});
console.log('');
console.log('请重启后端服务器后刷新 http://localhost:5173 查看！');
