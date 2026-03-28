# Loot Drop Scraper - 独立运行指南

## 📦 项目概述

`loot-drop-scraper` 是一个功能完整的独立CLI工具，用于自动化案例爬取和上传。

---

## 🚀 快速开始

### 1. 作为独立项目使用

#### 方式A：从主项目复制（当前方式）

```bash
# 1. 进入scraper目录
cd scraper

# 2. 安装依赖
npm install

# 3. 初始化工作目录
npm run init

# 4. 查看帮助
npm run help
```

#### 方式B：完全独立部署（推荐）

```bash
# 1. 创建新目录
mkdir loot-drop-scraper
cd loot-drop-scraper

# 2. 复制以下文件到新目录
cp -r ../scraper/* .

# 3. 删除archive目录（可选）
rm -rf archive

# 4. 安装依赖
npm install

# 5. 初始化
npm run init
```

---

## 📖 CLI 命令参考

### 完整命令列表

| 命令 | 说明 | 别名 |
|------|------|------|
| `npm run full` | 执行完整流程 | `node cli.js full` |
| `npm run scrape` | 仅爬取案例 | `node cli.js scrape` |
| `npm run upload` | 仅上传案例 | `node cli.js upload` |
| `npm run list` | 列出案例队列 | `node cli.js list` |
| `npm run config` | 显示当前配置 | `node cli.js config` |
| `npm run init` | 初始化工作目录 | `node cli.js init` |
| `npm run help` | 显示帮助 | `node cli.js --help` |

---

## 🔧 命令详细说明

### 1. 完整流程 - `full`

执行完整的爬取-上传-审核流程。

```bash
# 使用默认配置
npm run full

# 自定义API地址
node cli.js full --api-url http://your-server:3001/api

# 自定义账号
node cli.js full --username myuser --password mypass
```

**选项：**
- `--api-url <url>` - API基础URL
- `--username <user>` - 测试用户用户名
- `--password <pass>` - 测试用户密码
- `--admin-username <user>` - 管理员用户名
- `--admin-password <pass>` - 管理员密码

---

### 2. 仅爬取 - `scrape`

仅爬取新案例（不上传）。

```bash
# 爬取案例
npm run scrape

# 生成演示案例（不实际爬取）
node cli.js scrape --demo
```

**选项：**
- `--demo` - 生成演示案例，不实际爬取网络

---

### 3. 仅上传 - `upload`

仅上传待处理队列中的案例。

```bash
# 使用默认配置
npm run upload

# 自定义API和账号
node cli.js upload --api-url http://your-server:3001/api --username test --password 123456
```

**选项：**
- `--api-url <url>` - API基础URL
- `--username <user>` - 测试用户用户名
- `--password <pass>` - 测试用户密码

---

### 4. 列出队列 - `list`

查看待处理和已处理的案例。

```bash
npm run list
```

输出示例：
```
============================================================
案例队列状态
============================================================
待上传: 2 个
已上传: 5 个

待上传案例:
  1. FTX - 加密货币帝国的崩塌 (failure)
  2. Notion - 笔记协作平台 (success)
```

---

### 5. 清空队列 - `clear`

清空待处理队列。

```bash
# 查看提示
node cli.js clear

# 强制清空
node cli.js clear --force
```

**选项：**
- `--force` - 强制清空，不提示确认

---

### 6. 显示配置 - `config`

查看当前配置。

```bash
npm run config
```

输出示例：
```
============================================================
当前配置
============================================================
API URL: http://localhost:3001/api
测试用户: test
管理员用户: admin
请求延迟: 2000ms
最大重试: 3次
存储目录: /path/to/scraper/data
日志目录: /path/to/scraper/logs
```

---

### 7. 初始化目录 - `init`

创建必要的工作目录。

```bash
npm run init
```

创建的目录：
- `data/` - 存储待上传和已上传案例
- `logs/` - 存储日志文件

---

## ⚙️ 配置文件

编辑 `config.js` 自定义配置：

```javascript
module.exports = {
  // API配置
  API_BASE: 'http://localhost:3001/api',
  
  // 测试用户账号
  CREDENTIALS: {
    username: 'test',
    password: '123456'
  },
  
  // 管理员账号
  ADMIN_CREDENTIALS: {
    username: 'admin',
    password: 'admin123'
  },
  
  // 爬取配置
  REQUEST_DELAY: 2000,  // 请求延迟（毫秒）
  MAX_RETRIES: 3,       // 最大重试次数
  
  // 用户代理
  USER_AGENT: 'Mozilla/5.0 ...',
  
  // 目录配置
  STORAGE_DIR: path.join(__dirname, 'data'),
  LOG_DIR: path.join(__dirname, 'logs'),
  
  // 分类选项
  CATEGORIES: [
    'SaaS', '人工智能', '医疗科技', /* ... */
  ],
  
  // 案例类型
  CASE_TYPES: ['success', 'failure']
};
```

---

## 📁 项目结构

```
loot-drop-scraper/
├── cli.js                 # CLI入口文件（新增）
├── index.js               # 原主程序入口
├── config.js              # 配置文件
├── logger.js              # 日志模块
├── storage.js             # 存储模块
├── validator.js           # 验证模块
├── api-client.js          # API客户端
├── scraper.js             # 爬虫模块
├── uploader.js            # 上传模块
├── package.json           # 项目配置
├── README.md              # 原README
├── STANDALONE_SETUP.md    # 本文档
├── archive/               # 归档测试脚本
│   └── [测试脚本...]
├── data/                  # 数据目录（自动创建）
│   ├── cases.json         # 待上传案例
│   └── uploaded.json      # 已上传案例
└── logs/                  # 日志目录（自动创建）
    └── scraper-YYYY-MM-DD.log
```

---

## 🌐 与主系统解耦

### 通信方式

Scraper通过REST API与主系统通信，完全解耦：

```
Scraper (独立) ──REST API──> Loot Drop Backend
                  (HTTP)
```

### API端点

需要的API端点（主系统已提供）：

- `POST /api/auth/login` - 用户登录
- `POST /api/cases` - 创建案例
- `PUT /api/admin/cases/:id/approve` - 审核案例
- `GET /api/health` - 健康检查

---

## 🔄 工作流程

```
1. 检查队列
   └─→ 空？→ 爬取新案例
   
2. 爬取案例
   ├─→ 数据规范化
   ├─→ 质量验证
   ├─→ 去重检查
   └─→ 保存到队列

3. 上传案例
   ├─→ test用户登录
   ├─→ 提交到API
   └─→ 失败重试（最多3次）

4. 管理员审核
   ├─→ admin用户登录
   └─→ 自动审核通过

5. 完成
   └─→ 案例显示在首页
```

---

## 🛠️ 故障排除

### 问题1：找不到commander模块

**错误：** `Cannot find module 'commander'`

**解决方案：**
```bash
cd scraper
npm install
```

---

### 问题2：API连接失败

**错误：** `connect ECONNREFUSED`

**解决方案：**
1. 确认后端服务在运行
2. 检查API地址配置
3. 查看 `npm run config` 确认配置

---

### 问题3：登录失败

**错误：** `Login failed`

**解决方案：**
1. 确认账号密码正确
2. 确认用户已注册
3. 查看日志文件了解详情

---

## 📊 日志系统

所有操作记录到日志文件：

**位置：** `logs/scraper-YYYY-MM-DD.log`

**日志级别：**
- `INFO` - 一般信息
- `WARN` - 警告
- `ERROR` - 错误
- `SUCCESS` - 成功

---

## 🎯 使用示例

### 示例1：首次使用

```bash
# 1. 进入目录
cd scraper

# 2. 安装依赖
npm install

# 3. 初始化
npm run init

# 4. 查看配置
npm run config

# 5. 运行完整流程
npm run full
```

---

### 示例2：自定义API地址

```bash
# 使用远程服务器
node cli.js full --api-url https://your-domain.com/api
```

---

### 示例3：分步执行

```bash
# 1. 仅爬取
npm run scrape

# 2. 查看队列
npm run list

# 3. 仅上传
npm run upload
```

---

### 示例4：清空队列重新开始

```bash
# 1. 查看队列
npm run list

# 2. 强制清空
node cli.js clear --force

# 3. 确认已清空
npm run list
```

---

## 📝 注意事项

1. **后端服务** - 确保主系统后端在运行
2. **网络访问** - 确保能访问目标爬取网站
3. **存储空间** - 确保有足够磁盘空间
4. **定时任务** - 可使用 cron 或 PM2 设置定时运行

---

## 📚 相关文档

- [原README.md](./README.md) - 详细功能说明
- [原项目文档](../COMPREHENSIVE_AUDIT_REPORT.md) - 审计报告

---

## 🤝 贡献

欢迎提交Issue和Pull Request！

---

**文档版本：** 1.0.0  
**最后更新：** 2026-03-26
