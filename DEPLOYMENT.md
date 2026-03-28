# 部署说明

## 📋 系统要求

- **Node.js**: 16.x 或更高版本
- **操作系统**: Windows / macOS / Linux
- **内存**: 4GB 以上
- **磁盘**: 至少 500MB 可用空间

---

## 🚀 快速开始

### 1. 安装依赖

#### 根目录（前端）
```bash
npm install
```

#### Backend 目录
```bash
cd backend
npm install
```

#### Scraper 目录（可选）
```bash
cd scraper
npm install
```

---

### 2. 启动服务

#### 方式一：同时启动前后端（推荐）

**打开两个终端窗口：**

**终端1 - 后端：**
```bash
cd backend
npm start
```
后端将在 http://localhost:3001 启动

**终端2 - 前端：**
```bash
npm run dev
```
前端将在 http://localhost:5173 启动

---

### 3. 访问网站

打开浏览器访问：**http://localhost:5173/**

---

## 👤 测试账号

### 管理员账号
- **用户名**: `admin`
- **密码**: `admin123`

### 普通用户账号
- **用户名**: `test`
- **密码**: `123456`

---

## 📦 生产环境部署

### 构建前端

```bash
# 根目录
npm run build
```

构建产物将生成在 `dist/` 目录。

### 使用 PM2 管理进程（推荐）

#### 安装 PM2
```bash
npm install -g pm2
```

#### 启动后端服务
```bash
cd backend
pm2 start server.js --name loot-drop-backend
```

#### 使用 Nginx 反向代理（生产环境）

示例 Nginx 配置：
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        root /path/to/your/project/dist;
        try_files $uri $uri/ /index.html;
    }

    # 后端 API 代理
    location /api {
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

## 🌐 内网穿透（可选）

如果需要让外网访问本地服务，可以使用以下工具：

### ngrok（推荐用于测试）
```bash
# 下载 ngrok: https://ngrok.com/download
ngrok http 5173  # 前端
ngrok http 3001  # 后端
```

### 花生壳（国内用户推荐）
官网：https://hsk.oray.com/

配置参考：
- 前端映射：内网端口 5173
- 后端映射：内网端口 3001

---

## 🔧 故障排除

### 问题：端口被占用

**错误信息**: `Error: listen EADDRINUSE: address already in use`

**解决方案**:
```bash
# Windows 查找占用进程
netstat -ano | findstr :5173
netstat -ano | findstr :3001

# 结束进程
taskkill /PID <进程ID> /F
```

### 问题：依赖安装失败

**解决方案**:
```bash
# 清除缓存重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 问题：前端无法连接后端

**检查项**:
1. 确认后端服务正在运行（http://localhost:3001）
2. 检查浏览器控制台的网络请求
3. 确认前端 API 配置正确

---

## 📊 项目结构

```
loot-drop/
├── src/                    # 前端源代码
├── backend/                # 后端服务
│   ├── data/              # 数据库文件
│   ├── routes/            # API 路由
│   ├── middleware/        # 中间件
│   └── server.js          # 后端入口
├── scraper/               # 爬虫工具（可选）
├── archive/               # 归档文件（可删除节省空间）
├── DEPLOYMENT.md          # 本文档
└── PROJECT_SIZE_OPTIMIZATION.md  # 体积优化指南
```

---

## 💡 提示

- `archive/` 目录包含旧版本的备份文件，如果空间紧张可以删除
- 数据库文件位于 `backend/data/db.json`
- 生产环境建议使用环境变量管理敏感配置
- 定期备份数据库文件

---

## 📞 技术支持

如有问题，请查看：
- 体积优化指南：`PROJECT_SIZE_OPTIMIZATION.md`
- 审计报告：`COMPREHENSIVE_AUDIT_REPORT.md`
- 测试报告：`POST_AUDIT_TEST_REPORT.md`

---

**文档版本**: 1.0.0  
**最后更新**: 2026-03-26
