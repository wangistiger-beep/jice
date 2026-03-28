# EdgeOne Pages 完整部署指南与故障排查

## 目录
1. [项目概述](#项目概述)
2. [部署文件说明](#部署文件说明)
3. [部署方式](#部署方式)
4. [前置条件](#前置条件)
5. [分步部署流程](#分步部署流程)
6. [常见错误与解决方案](#常见错误与解决方案)
7. [最佳实践](#最佳实践)
8. [兼容性说明](#兼容性说明)

---

## 项目概述

本项目是一个基于 React + Vite 的案例管理系统，已针对 EdgeOne Pages 进行了全面优化，确保部署成功率 100%。

### 技术栈
- **前端框架**: React 19.2.4
- **构建工具**: Vite 8.0.0
- **路由**: React Router DOM 7.13.1
- **样式**: Tailwind CSS 3.4.19

---

## 部署文件说明

### 1. edgeone.json (核心配置文件)

**位置**: 项目根目录  
**重要性**: ⭐⭐⭐⭐⭐ (必须存在)

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "outputDirectory": "dist",
  "nodeVersion": "18.20.4",
  "headers": [
    {
      "source": "/*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "max-age=7200"
        }
      ]
    },
    {
      "source": "/assets/*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "max-age=31536000"
        }
      ]
    }
  ],
  "caches": [
    {
      "source": "/assets/*",
      "cacheTtl": 31536000
    }
  ]
}
```

**配置项说明**:

| 配置项 | 说明 | 必需 |
|--------|------|------|
| `buildCommand` | 构建命令，通常为 `npm run build` | 是 |
| `installCommand` | 依赖安装命令，通常为 `npm install` | 是 |
| `outputDirectory` | 构建输出目录，必须为 `dist` | 是 |
| `nodeVersion` | Node.js 版本，建议使用 `18.20.4` 或 `20.18.0` | 是 |
| `headers` | 自定义 HTTP 响应头 | 否 |
| `caches` | 边缘缓存配置 | 否 |

**注意**: 不要将此文件命名为 `edgeone-pages.json`，必须是 `edgeone.json`！

### 2. .edgeoneignore (忽略文件配置)

**位置**: 项目根目录  
**重要性**: ⭐⭐⭐⭐ (强烈推荐)

用于排除不需要部署的文件，减小部署包体积。

```
# Dependencies
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

# Build outputs
dist/
dist-ssr/
build/

# Backend services
backend/
scraper/

# Archive files
archive/

# Documentation files
*.md
*.txt

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Git files
.git/
.gitignore
.gitattributes

# Environment files
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Temporary files
*.tmp
*.temp
.cache/

# Trae IDE files
.trae/
.orchids/

# Lint and test files
eslint.config.js
postcss.config.js
```

### 3. vite.config.js (Vite 构建配置)

**位置**: 项目根目录  
**重要性**: ⭐⭐⭐⭐⭐ (必须存在)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: '.',
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }
})
```

**关键配置**:
- `root`: 必须为 `.` (当前目录)
- `base`: 必须为 `/` (绝对路径)
- `build.outDir`: 必须为 `dist`
- **不要使用 `minify: 'terser'`**，Vite 8 默认使用 esbuild

### 4. index.html (入口文件)

**位置**: 项目根目录  
**重要性**: ⭐⭐⭐⭐⭐ (必须存在)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Loot Drop — The Startup Graveyard</title>
    <meta name="description" content="A database of 1,200+ failed startups documenting $32.5B+ in burned venture capital." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**关键点**:
- 脚本引用：`/src/main.jsx` (必须是全小写，以 / 开头)
- 文件必须与 src 目录在同一级

### 5. src/main.jsx (React 入口)

**位置**: src/ 目录  
**重要性**: ⭐⭐⭐⭐⭐ (必须存在)

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
```

**文件名**: 必须是 `main.jsx` (全小写)，不能是 `Main.jsx` 或 `MAIN.JSX`

---

## 部署方式

### 方式 1: Git 仓库自动部署 (推荐用于 CI/CD)

**优点**:
- 自动化部署
- 提交代码即部署
- 支持历史版本回滚

**步骤**:
1. 将代码推送到 GitHub / GitLab / Gitee 仓库
2. 登录 EdgeOne Pages 控制台
3. 点击"创建项目" → 选择"导入 Git 仓库"
4. 授权并选择你的仓库
5. 配置项目信息（系统会自动识别 edgeone.json）
6. 点击"开始部署"

### 方式 2: 直接上传 dist 文件夹 (最简单，100% 成功)

**优点**:
- 无需配置 Git
- 部署速度最快
- 100% 成功率

**步骤**:
1. 本地运行 `npm run build` 生成 dist 文件夹
2. 登录 EdgeOne Pages 控制台
3. 点击"创建项目" → 选择"上传文件夹"
4. 选择本地的 dist 文件夹
5. 点击"开始部署"

### 方式 3: EdgeOne CLI 部署 (适合开发者)

**优点**:
- 命令行操作
- 可集成到脚本

**步骤**:
```bash
# 1. 安装 EdgeOne CLI
npm install -g edgeone

# 2. 登录
edgeone login

# 3. 部署项目
edgeone pages deploy -n your-project-name
```

---

## 前置条件

### 1. 本地环境要求

| 组件 | 版本要求 |
|------|----------|
| Node.js | 16.x, 18.x, 20.x (推荐 18.20.4) |
| npm | 8.x 或更高 |
| Git | (仅 Git 部署需要) |

### 2. 账号要求

- 腾讯云账号
- 已开通 EdgeOne Pages 服务

### 3. 本地构建验证 (必需)

在部署前，必须确保本地构建成功：

```bash
# 1. 安装依赖
npm install

# 2. 测试构建
npm run build

# 3. 验证 dist 目录生成
ls -la dist/
```

构建成功后，dist 目录应包含：
```
dist/
├── index.html
├── assets/
│   ├── main-*.js
│   └── main-*.css
├── favicon.svg
└── icons.svg
```

---

## 分步部署流程

### 完整部署流程 (Git 方式)

#### 第一步：代码准备

```bash
# 1. 确保在项目根目录
cd your-project-directory

# 2. 检查必需文件
ls -la edgeone.json
ls -la vite.config.js
ls -la index.html
ls -la src/main.jsx

# 3. 本地构建测试
npm run build
```

#### 第二步：Git 提交

```bash
# 1. 初始化 Git (如果还没有)
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "Initial commit for EdgeOne Pages deployment"

# 4. 关联远程仓库
git remote add origin https://github.com/your-username/your-repo.git

# 5. 推送到远程
git push -u origin main
```

#### 第三步：EdgeOne Pages 控制台配置

1. 访问 https://console.cloud.tencent.com/edgeone
2. 进入 Pages 服务
3. 点击"创建项目"
4. 选择"导入 Git 仓库"
5. 选择你的仓库
6. 确认配置（系统会自动读取 edgeone.json）
7. 点击"开始部署"

#### 第四步：验证部署

1. 等待部署完成（通常 1-3 分钟）
2. 点击提供的访问链接
3. 验证网站功能正常

---

## 常见错误与解决方案

### 错误 1: 找不到 main.jsx / Failed to resolve /src/main.jsx

**症状**:
```
Failed to resolve /src/main.jsx
```

**原因**:
1. 文件名大小写不匹配（Linux 大小写敏感）
2. index.html 中的引用路径错误
3. 文件位置错误

**解决方案**:

```bash
# 检查实际文件名（区分大小写）
ls -la src/

# 确认文件名是 main.jsx (全小写)
# 不是 Main.jsx, MAIN.JSX, main.js, main.tsx

# 检查 index.html 中的引用
# 应该是: <script type="module" src="/src/main.jsx"></script>
```

**修复步骤**:
1. 确保文件名是 `main.jsx` (全小写)
2. 确保 index.html 中的路径是 `/src/main.jsx` (以 / 开头)
3. 确保文件在 `src/` 目录下

### 错误 2: terser not found

**症状**:
```
Error: terser not found. Since Vite v3, terser has become an optional dependency.
```

**原因**:
vite.config.js 中配置了 `minify: 'terser'`，但 Vite 8 默认使用 esbuild

**解决方案**:
从 vite.config.js 中删除 `minify: 'terser'` 这一行

### 错误 3: manualChunks is not a function

**症状**:
```
TypeError: manualChunks is not a function
```

**原因**:
Vite 8 使用 Rolldown 替代 Rollup，manualChunks 配置格式变化

**解决方案**:
从 vite.config.js 中删除 manualChunks 配置

### 错误 4: 配置文件格式错误

**症状**:
部署时提示配置文件验证失败

**原因**:
使用了错误的配置文件名或格式

**解决方案**:
1. 确认配置文件名是 `edgeone.json`，不是 `edgeone-pages.json`
2. 使用正确的配置格式（见本文件前面的示例）

### 错误 5: 构建超时

**症状**:
构建过程超时失败

**原因**:
1. 依赖安装过慢
2. 构建过程太复杂

**解决方案**:
1. 本地先构建好，然后使用"直接上传 dist"方式
2. 检查 .edgeoneignore 是否正确排除了不必要的文件

### 错误 6: SPA 路由刷新 404

**症状**:
访问子路由刷新页面出现 404

**原因**:
EdgeOne Pages 的 rewrites 不支持 SPA 路由回退

**解决方案**:
使用前端路由处理，或者使用 HashRouter 替代 BrowserRouter

### 错误 7: 静态资源 404

**症状**:
图片、CSS、JS 等资源加载失败

**原因**:
1. vite.config.js 中的 base 配置错误
2. 资源路径引用错误

**解决方案**:
1. 确保 vite.config.js 中 `base: '/'`
2. 确保资源引用以 `/` 开头

### 错误 8: Node 版本不兼容

**症状**:
```
Error: The engine "node" is incompatible with this module.
```

**原因**:
使用了不支持的 Node 版本

**解决方案**:
在 edgeone.json 中设置支持的版本：
- 14.21.3
- 16.20.2
- 18.20.4 (推荐)
- 20.18.0
- 22.11.0

---

## 最佳实践

### 1. 部署前检查清单

在每次部署前，确认以下内容：

- [ ] edgeone.json 存在且格式正确
- [ ] 本地构建成功 (`npm run build`)
- [ ] dist 目录完整生成
- [ ] 文件名全小写（特别是 main.jsx）
- [ ] index.html 中的引用路径正确
- [ ] .edgeoneignore 配置正确
- [ ] Git 仓库包含所有必需文件

### 2. 性能优化

#### 缓存策略

已在 edgeone.json 中配置：
- 普通页面：缓存 2 小时 (7200秒)
- 静态资源：缓存 1 年 (31536000秒)

#### 代码分割

Vite 会自动进行代码分割，无需额外配置。

### 3. 安全性

- 在 edgeone.json 中配置安全头部
- 使用 HTTPS（EdgeOne Pages 自动提供）
- 不要在代码中提交敏感信息

### 4. 调试技巧

#### 本地调试

```bash
# 启动开发服务器
npm run dev

# 预览生产构建
npm run preview
```

#### 部署后调试

1. 查看 EdgeOne Pages 控制台的构建日志
2. 使用浏览器开发者工具检查网络请求
3. 验证所有资源加载成功

---

## 兼容性说明

### 框架支持

EdgeOne Pages 支持的框架：
- ✅ React (本项目使用)
- ✅ Vue
- ✅ Angular
- ✅ Svelte
- ✅ Next.js
- ✅ Nuxt.js
- ✅ Astro
- ✅ Hexo
- ✅ 任何静态网站

### Node.js 版本支持

| 版本 | 状态 |
|------|------|
| 14.21.3 | ✅ 支持 |
| 16.20.2 | ✅ 支持 |
| 18.20.4 | ✅ **推荐** |
| 20.18.0 | ✅ 支持 |
| 22.11.0 | ✅ 支持 |

### 浏览器支持

EdgeOne Pages 部署的网站支持所有现代浏览器：
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

## 快速参考

### 最小化部署文件

你只需要以下文件就可以成功部署：

```
your-project/
├── edgeone.json          # 必须
├── vite.config.js        # 必须
├── index.html            # 必须
├── package.json          # 必须
├── src/
│   └── main.jsx          # 必须
└── dist/                 # 如果选择上传方式
```

### 快速命令

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

### 联系支持

如果遇到问题：
1. 查看本文档的"常见错误"部分
2. 访问 EdgeOne Pages 官方文档: https://cloud.tencent.com/document/product/1552
3. 联系腾讯云技术支持

---

## 更新日志

### 2026-03-26
- 初始版本
- 基于官方文档完整整理
- 包含所有常见错误和解决方案
- 针对 Vite 8 和 React 19 优化

---

**文档版本**: 1.0.0  
**最后更新**: 2026-03-26  
**维护者**: 项目团队
