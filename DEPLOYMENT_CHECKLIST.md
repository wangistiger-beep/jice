# EdgeOne Pages 部署前最终检查清单

## 部署前必须完成的检查项目

### ✅ 第一阶段：文件检查

- [ ] **edgeone.json** 存在于项目根目录
  - [ ] 文件名正确（不是 edgeone-pages.json）
  - [ ] JSON 格式有效
  - [ ] 包含 `buildCommand: "npm run build"`
  - [ ] 包含 `outputDirectory: "dist"`
  - [ ] 包含 `nodeVersion: "18.20.4"`（或其他支持的版本）

- [ ] **vite.config.js** 存在于项目根目录
  - [ ] `root: '.'` 配置正确
  - [ ] `base: '/'` 配置正确
  - [ ] `build.outDir: 'dist'` 配置正确
  - [ ] 没有 `minify: 'terser'` 配置
  - [ ] 没有 `manualChunks` 配置

- [ ] **index.html** 存在于项目根目录
  - [ ] 引用路径为 `/src/main.jsx`（小写，以 / 开头）
  - [ ] 没有引用 `/src/Main.jsx` 或其他大小写变体

- [ ] **src/main.jsx** 存在于 src 目录
  - [ ] 文件名全小写：`main.jsx`
  - [ ] 不是 `Main.jsx`
  - [ ] 不是 `MAIN.JSX`
  - [ ] 不是 `main.js` 或 `main.tsx`

- [ ] **package.json** 存在于项目根目录
  - [ ] 包含 `scripts.build` 命令
  - [ ] 包含 `scripts.dev` 命令
  - [ ] `type: "module"` 配置正确（如使用 ES 模块）

- [ ] **.edgeoneignore** 存在于项目根目录（推荐）
  - [ ] 排除 `node_modules/`
  - [ ] 排除 `dist/`
  - [ ] 排除 `backend/` 和 `scraper/`（如果有）
  - [ ] 排除 `*.md` 文档文件

- [ ] **public/404.html** 存在（可选但推荐）
  - [ ] 自定义 404 页面已创建

### ✅ 第二阶段：本地构建测试

- [ ] 运行 `npm install` 成功完成
- [ ] 运行 `npm run build` 成功完成
- [ ] **dist/** 目录成功生成
  - [ ] dist/index.html 存在
  - [ ] dist/assets/ 目录存在
  - [ ] dist/assets/main-*.js 存在
  - [ ] dist/assets/main-*.css 存在
  - [ ] dist/favicon.svg 存在
  - [ ] dist/icons.svg 存在

- [ ] 运行验证脚本（如果有）
  - [ ] `node verify-deployment.cjs` 所有检查通过

### ✅ 第三阶段：Git 仓库准备（仅 Git 部署方式）

- [ ] Git 仓库已初始化
- [ ] 所有必需文件已添加到 Git
  - [ ] edgeone.json
  - [ ] vite.config.js
  - [ ] index.html
  - [ ] package.json
  - [ ] package-lock.json（或 yarn.lock/pnpm-lock.yaml）
  - [ ] src/ 目录下的所有源文件
  - [ ] public/ 目录下的所有文件
  - [ ] .edgeoneignore（如果有）

- [ ] 已提交更改
- [ ] 已推送到远程仓库（GitHub/GitLab/Gitee）

### ✅ 第四阶段：选择部署方式

#### 方式 A：Git 仓库自动部署（推荐用于 CI/CD）

- [ ] 已登录 EdgeOne Pages 控制台
- [ ] 已创建新项目
- [ ] 已选择"导入 Git 仓库"
- [ ] 已授权并选择正确的仓库
- [ ] 已确认构建配置（系统应自动读取 edgeone.json）
- [ ] 已点击"开始部署"
- [ ] 等待部署完成（1-3 分钟）
- [ ] 验证部署成功并访问网站

#### 方式 B：直接上传 dist 文件夹（推荐，100% 成功）

- [ ] 已登录 EdgeOne Pages 控制台
- [ ] 已创建新项目
- [ ] 已选择"直接上传"
- [ ] 已选择本地的 **dist/** 文件夹
- [ ] 已点击"开始部署"
- [ ] 等待部署完成（通常更快）
- [ ] 验证部署成功并访问网站

#### 方式 C：EdgeOne CLI 部署

- [ ] 已全局安装 EdgeOne CLI：`npm install -g edgeone`
- [ ] 已登录：`edgeone login`
- [ ] 已运行部署命令：`edgeone pages deploy -n your-project-name`
- [ ] 等待部署完成
- [ ] 验证部署成功并访问网站

### ✅ 第五阶段：部署后验证

- [ ] 网站可以正常访问
- [ ] 首页加载正常
- [ ] 所有图片资源加载正常（无 404）
- [ ] CSS 样式加载正常
- [ ] JavaScript 功能正常
- [ ] 路由导航正常（如为 SPA）
- [ ] 自定义 404 页面正常工作（如果有）
- [ ] 检查浏览器控制台无错误

### 📋 快速命令参考

```bash
# 1. 安装依赖
npm install

# 2. 本地开发测试
npm run dev

# 3. 生产构建
npm run build

# 4. 预览构建结果
npm run preview

# 5. 运行部署验证（如果有）
node verify-deployment.cjs
```

### 🔧 常见问题快速解决

| 问题 | 解决方案 |
|------|----------|
| 找不到 main.jsx | 确保文件名全小写，index.html 中引用正确 |
| terser not found | 从 vite.config.js 中删除 `minify: 'terser'` |
| manualChunks 错误 | 从 vite.config.js 中删除 manualChunks 配置 |
| 配置文件错误 | 确保文件名为 edgeone.json，格式正确 |
| 静态资源 404 | 确保 vite.config.js 中 `base: '/'` |
| 构建超时 | 使用直接上传 dist 文件夹的方式 |

### 📚 相关文档

- **完整部署指南**: `EDGEONE_COMPLETE_GUIDE.md`
- **验证脚本**: `verify-deployment.cjs`
- **官方文档**: https://pages.edgeone.ai/zh/document

---

**最后更新**: 2026-03-26  
**检查清单版本**: 1.0.0
