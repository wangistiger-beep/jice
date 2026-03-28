const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../backend/data/db.json');

let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const newCase = {
  id: db.cases.length + 1,
  title: "微软 - 软件帝国的百年征程",
  description: "微软从一家小型软件公司成长为全球科技巨头的完整发展历程",
  caseType: "success",
  category: "软件",
  tags: ["操作系统", "云服务", "企业软件", "人工智能"],
  status: "pending",
  authorId: 2,
  logo: "🪟",
  profitAmount: "约2500亿美元（2024年营收）",
  lossAmount: "",
  marketPotentialScore: 5,
  potentialScale: 5,
  rebuildPotential: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  profile: {
    companyName: "微软（Microsoft）",
    location: "美国华盛顿州雷德蒙德",
    coreTech: "操作系统、办公软件、云计算、AI",
    totalFunding: "无需融资（IPO融资）",
    investors: "盖茨基金会、华尔街机构投资者",
    vision: "让每个家庭的每张桌上都有一台电脑",
    founded: "1975-04-04",
    closed: null,
    cashBurned: "0（盈利公司）"
  },
  success: {
    successFactor: "抓住个人电脑革命，战略转型云服务",
    marketStrategy: "生态系统构建，开发者友好策略",
    businessModel: "软件许可+订阅+云服务",
    techInnovation: "Windows操作系统、Office套件、Azure云",
    growthStrategy: "并购扩张、多产品线布局",
    successLessons: "持续战略转型、拥抱开源、以客户为中心"
  },
  assessment: {
    marketPotential: "软件和云服务市场持续增长，潜力巨大",
    difficultyAnalysis: "技术壁垒高，需要持续创新能力",
    scalabilityAnalysis: "软件和云服务具有极佳的可扩展性"
  },
  rebuild: {
    pivotConcept: "持续保持技术领先和业务多元化",
    insight: "软件行业变化快，需要持续战略转型",
    productRefactor: "保持Windows和Office优势，强化Azure和AI",
    wedge: "企业客户和开发者生态"
  },
  execution: {
    techStack: "C++, C#, Azure, .NET, Copilot AI",
    phase1: {
      title: "基础建设",
      timeframe: "1975-1990",
      objectives: ["建立DOS操作系统", "与IBM合作"]
    },
    phase2: {
      title: "产品验证",
      timeframe: "1990-2000",
      objectives: ["Windows 95发布", "Office套件成熟"]
    },
    phase3: {
      title: "规模扩张",
      timeframe: "2000-2014",
      objectives: ["企业软件市场", "Xbox游戏业务"]
    },
    phase4: {
      title: "护城河构建",
      timeframe: "2014至今",
      objectives: ["云转型（Azure）", "AI战略（Copilot）"]
    }
  },
  monetization: {
    revenueStreams: ["Windows许可", "Office订阅", "Azure云服务", "GitHub", "Xbox"],
    profitAnalysis: "高利润率软件业务，云服务持续增长",
    exitLogic: "持续独立运营，技术护城河深厚"
  },
  reviewNotes: "",
  reviewedAt: null,
  reviewedBy: null
};

db.cases.push(newCase);

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

console.log('✅ 微软案例创建成功！');
console.log('📋 案例ID:', newCase.id);
console.log('📋 标题:', newCase.title);
console.log('📋 类型:', newCase.caseType);
console.log('📋 盈利金额:', newCase.profitAmount);
console.log('📋 状态:', newCase.status);
console.log('');
console.log('📊 当前数据库案例总数:', db.cases.length);
console.log('');
console.log('下一步: 需要管理员审核通过该案例');
