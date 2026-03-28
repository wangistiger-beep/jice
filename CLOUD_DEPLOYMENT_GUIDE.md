# 云服务器部署指南

## 🔍 问题分析

**错误信息：**
```
Error: Failed to resolve /src/main.jsx from /index.html
```

**原因：** 云部署平台（如腾讯云开发）在构建时找不到入口文件。

---

## 🛠️ 解决方案

### 方案一：确保部署文件完整（推荐）

#### 1. 检查必须包含的文件

部署时必须包含以下文件：

```
项目根目录/
├── index.html              ✅ 必须
├── package.json            ✅ 必须
├── vite.config.js          ✅ 必须
├── tailwind.config.js      ✅ 必须（如果有）
├── postcss.config.js       ✅ 必须（如果有）
├── src/
│   ├── main.jsx            ✅ 必须
│   ├── App.jsx
│   ├── index.css
│   └── components/
└── backend/                ❌ 可选（单独部署）
```

#### 2. 不要包含的文件（减少体积）

```
❌ node_modules/
❌ dist/
❌ .git/
❌ archive/
❌ scraper/（可选）
```

---

### 方案二：修复 vite.config.js（推荐）

添加明确的根路径配置：

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',                    // 明确根目录
  base: './',                   // 相对路径
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html'    // 明确入口文件
      }
    }
  }
})
```

---

### 方案三：腾讯云开发专用配置

如果使用腾讯云开发（TCB），添加 `cloudbaserc.json`：

```json
{
  "version": "2.0",
  "envId": "your-env-id",
  "$schema": "https://framework-1258016615.tcloudbaseapp.com/schema/latest.json",
  "framework": {
    "name": "loot-drop",
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-website",
        "inputs": {
          "buildCommand": "npm run build",
          "outputPath": "dist",
          "cloudPath": "/",
          "envVariables": {
            "VITE_API_URL": "https://your-backend-api.com"
          }
        }
      }
    }
  }
}
```

---

## 📦 推荐的部署架构

### 架构：前后端分离部署

```
┌─────────────────────────────────────────┐
│         前端（静态托管）              │
│  - 腾讯云开发/Cloudflare Pages     │
│  - Vercel/Netlify                   │
│  - 域名：your-domain.com            │
└─────────────────────────────────────────┘
              │
              │ API请求
              ↓
┌─────────────────────────────────────────┐
│         后端（云服务器）              │
│  - 阿里云/腾讯云云服务器            │
│  - PM2 + Nginx                      │
│  - 域名：api.your-domain.com        │
└─────────────────────────────────────────┘
```

---

## 🚀 分步部署指南

### 第一步：准备前端部署包

#### 1. 本地测试构建

```bash
# 根目录
npm install
npm run build
```

确保 `dist/` 目录生成成功！

#### 2. 创建部署压缩包

**PowerShell：**
```powershell
# 只包含必要文件
$include = @('index.html', 'package.json', 'vite.config.js', 'tailwind.config.js', 'postcss.config.js', 'src', 'public')
Compress-Archive -Path $include -DestinationPath loot-drop-frontend.zip
```

---

### 第二步：前端部署（以腾讯云开发为例）

#### 1. 登录腾讯云开发控制台

访问：https://console.cloud.tencent.com/tcb

#### 2. 创建环境

- 选择"按量付费"或"免费版"
- 环境名称：`loot-drop-env`

#### 3. 上传并部署

1. 进入"静态网站托管"
2. 上传 `loot-drop-frontend.zip`
3. 或使用 CLI 部署：

```bash
# 安装 CloudBase CLI
npm install -g @cloudbase/cli

# 登录
tcb login

# 初始化
tcb init

# 部署
tcb framework deploy
```

---

### 第三步：后端部署

#### 1. 购买云服务器

推荐配置：
- CPU：2核
- 内存：4GB
- 系统：Ubuntu 22.04 LTS
- 带宽：3Mbps

#### 2. 连接服务器

```bash
ssh root@your-server-ip
```

#### 3. 安装环境

```bash
# 更新系统
apt update && apt upgrade -y

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 安装 PM2
npm install -g pm2
```

#### 4. 上传后端代码

使用 SCP 或 SFTP 上传 `backend/` 目录

#### 5. 启动后端服务

```bash
cd backend
npm install
pm2 start server.js --name loot-drop-backend
pm2 save
pm2 startup
```

#### 6. 配置 Nginx（可选但推荐）

```nginx
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔧 云开发快速修复（针对当前错误）

如果您正在使用腾讯云开发并遇到 `main.jsx` 错误：

### 快速修复步骤

#### 1. 确保以下文件都在部署包根目录

```
✅ index.html
✅ package.json
✅ vite.config.js
✅ tailwind.config.js
✅ postcss.config.js
✅ src/main.jsx
✅ src/App.jsx
✅ src/index.css
✅ src/components/...
```

#### 2. 修改 vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: process.cwd(),
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }
})
```

#### 3. 重新部署

1. 删除云开发中的当前应用
2. 重新上传完整的部署包
3. 确保包含 `src/` 完整目录

---

## 📋 部署检查清单

部署前请确认：

- [ ] `index.html` 在根目录
- [ ] `src/main.jsx` 存在
- [ ] `package.json` 有 `build` 脚本
- [ ] `vite.config.js` 已配置
- [ ] 已本地测试 `npm run build` 成功
- [ ] 部署包不包含 `node_modules`
- [ ] 后端 API 地址已配置

---

## 🆘 常见问题

### Q: 构建时提示找不到 main.jsx？

**A:** 确保以下几点：
1. `src/main.jsx` 文件存在
2. 文件路径大小写正确（Linux 区分大小写）
3. `vite.config.js` 中配置了正确的 root
4. 部署包包含完整的 `src/` 目录

### Q: 前端部署成功但无法连接后端？

**A:**
1. 检查后端服务是否正常运行
2. 检查防火墙是否开放 3001 端口
3. 配置 CORS（如果前后端不同域）
4. 前端 API 地址配置正确

### Q: 如何配置环境变量？

**A:** 创建 `.env.production` 文件：
```env
VITE_API_URL=https://api.your-domain.com/api
```

---

## 📞 技术支持

如仍有问题，请提供：
1. 完整的错误日志
2. 部署平台名称（腾讯云/阿里云/Vercel等）
3. 部署包的文件结构截图

---

**文档版本**: 1.0.0  
**最后更新**: 2026-03-26
