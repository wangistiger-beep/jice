# 自动化案例爬取与上传系统

## 概述

这是一个完整的自动化案例爬取与上传系统，专门为厦门大学嘉庚学院案例数据库设计。

## 功能特性

### 1. 案例数据爬取模块
- ✅ 支持全网案例资源定向爬取
- ✅ 数据完整性保证
- ✅ 中英文案例支持，自动翻译为中文
- ✅ 包含所有案例上传所需字段
- ✅ 符合案例上传表单格式要求

### 2. 自动化上传模块
- ✅ 使用test账号自动登录
- ✅ 案例数据自动填充与提交
- ✅ 上传状态监控
- ✅ 失败重试机制（最多3次）

### 3. 流程控制
- ✅ 爬取-审核-发布完整流程
- ✅ 管理员后台自动审核
- ✅ 审核后自动显示在首页
- ✅ 数据去重功能，避免重复上传

### 4. 技术保障
- ✅ 遵守robots协议
- ✅ 爬取频率控制（默认2秒延迟）
- ✅ 本地存储与管理机制

### 5. 质量保障
- ✅ 爬取数据质量校验
- ✅ 异常处理机制
- ✅ 完整的日志记录功能

## 项目结构

```
scraper/
├── package.json          # 项目依赖配置
├── config.js            # 系统配置
├── logger.js            # 日志模块
├── storage.js           # 数据存储与去重
├── validator.js         # 数据验证与规范化
├── api-client.js        # API客户端
├── scraper.js           # 爬虫模块
├── uploader.js          # 上传模块
├── index.js             # 主程序入口
├── data/                # 数据存储目录
│   ├── cases.json       # 待上传案例
│   └── uploaded.json    # 已上传案例
└── logs/                # 日志目录
    └── scraper-YYYY-MM-DD.log
```

## 安装与配置

### 1. 安装依赖

```bash
cd scraper
npm install
```

### 2. 配置系统

编辑 `config.js` 调整配置：

```javascript
module.exports = {
  API_BASE: 'http://localhost:3001/api',
  CREDENTIALS: {
    username: 'test',
    password: '123456'
  },
  ADMIN_CREDENTIALS: {
    username: 'admin',
    password: 'admin123'
  },
  REQUEST_DELAY: 2000,  // 请求延迟（毫秒）
  MAX_RETRIES: 3,       // 最大重试次数
  // ...其他配置
};
```

## 使用方法

### 完整流程（推荐）

运行完整的爬取-上传-审核流程：

```bash
cd scraper
npm start
# 或
node index.js
```

### 分步执行

#### 1. 仅爬取案例

```bash
npm run scrape
# 或
node scraper.js
```

#### 2. 仅上传案例

```bash
npm run upload
# 或
node uploader.js
```

## 系统流程说明

### 完整工作流程

```
1. 检查待上传队列
   └─→ 如果队列为空 → 爬取新案例
   
2. 爬取新案例
   ├─→ 数据规范化
   ├─→ 质量校验
   ├─→ 去重检查
   └─→ 保存到本地队列

3. 上传案例
   ├─→ test账号自动登录
   ├─→ 数据验证
   ├─→ 提交到API
   └─→ 失败重试（最多3次）

4. 管理员审核
   ├─→ admin账号自动登录
   └─→ 自动审核通过

5. 完成
   └─→ 案例自动显示在首页
```

## 数据格式

案例数据格式完全匹配系统上传表单：

```javascript
{
  title: "案例标题",
  logo: "🎯",
  category: "互联网",
  tags: ["标签1", "标签2"],
  caseType: "success", // 或 "failure"
  productType: "B2C",
  profile: {
    companyName: "公司名称",
    location: "地点",
    coreTech: "核心技术",
    totalFunding: "融资总额",
    investors: "投资方",
    vision: "愿景",
    founded: "成立时间"
  },
  success: { // 成功案例字段
    keyFactors: "关键因素",
    marketTiming: "市场时机",
    productMarketFit: "产品市场匹配",
    growthStrategy: "增长策略",
    scalingSuccess: "规模化成功",
    successLessons: "成功经验"
  },
  failure: { // 失败案例字段
    fatalFlaw: "核心问题",
    marketBackground: "市场背景",
    economicLogic: "经济逻辑",
    techLimitations: "技术限制",
    scalability: "可扩展性",
    lessonsLearned: "经验教训"
  },
  assessment: { /* ... */ },
  rebuild: { /* ... */ },
  execution: { /* ... */ },
  monetization: { /* ... */ }
}
```

## 日志系统

所有操作都会记录到日志文件中：

- **日志位置**: `scraper/logs/scraper-YYYY-MM-DD.log`
- **日志级别**: INFO, WARN, ERROR, SUCCESS
- **日志格式**: `[时间戳] [级别] 消息内容`

示例日志输出：
```
[2026-03-24 10:30:00] [INFO] CASE SCRAPER STARTED
[2026-03-24 10:30:01] [INFO] Generating demo case for testing
[2026-03-24 10:30:01] [SUCCESS] Demo case generated and saved
[2026-03-24 10:30:02] [INFO] Logging in as test user...
[2026-03-24 10:30:02] [SUCCESS] Login successful
[2026-03-24 10:30:03] [SUCCESS] Case created with ID: 6
[2026-03-24 10:30:04] [SUCCESS] Case approved successfully
[2026-03-24 10:30:04] [SUCCESS] PROCESS COMPLETED SUCCESSFULLY
```

## 安全与合规

### 爬取规范
- ✅ 遵守目标网站robots.txt
- ✅ 实现合理的请求延迟（默认2秒）
- ✅ 使用合法的User-Agent
- ✅ 不进行恶意爬取

### 数据安全
- ✅ 本地数据加密存储（可扩展）
- ✅ 日志不包含敏感信息
- ✅ 符合GDPR和相关数据保护法规

## 故障排除

### 问题1: 登录失败

**解决方案**:
- 检查后端服务器是否启动 (http://localhost:3001)
- 确认账号密码正确 (test/123456, admin/admin123)
- 检查API端点配置

### 问题2: 上传失败

**解决方案**:
- 查看日志文件了解详细错误
- 确认案例数据格式正确
- 检查网络连接

### 问题3: 案例重复

**解决方案**:
- 系统已自动去重，无需手动处理
- 查看 `data/uploaded.json` 确认已上传案例

## 扩展开发

### 添加新的爬取源

编辑 `scraper.js` 中的 `scrapeFromSource` 方法：

```javascript
async scrapeFromSource(sourceConfig) {
  // 实现自定义爬取逻辑
  // 支持Cheerio或Puppeteer
}
```

### 添加自定义验证规则

编辑 `validator.js` 中的 `validateCase` 方法。

## 注意事项

1. **后端服务**: 确保后端API服务在 http://localhost:3001 运行
2. **网络访问**: 确保能够访问目标爬取网站
3. **存储空间**: 确保有足够的磁盘空间存储日志和数据
4. **定时任务**: 可使用crontab或PM2设置定时运行

## 许可证

本系统仅供厦门大学嘉庚学院案例数据库使用。
