# 部署指南

## 系统要求

- Node.js 16 或更高版本
- npm 或 yarn
- 至少 512MB 可用内存
- 至少 1GB 可用磁盘空间

## 本地开发环境

### 1. 安装依赖

```bash
cd backend
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:3001` 启动

### 3. 访问健康检查端点

```bash
curl http://localhost:3001/api/health
```

## 生产环境部署

### 方式一：使用 PM2（推荐）

1. 安装 PM2
```bash
npm install -g pm2
```

2. 启动应用
```bash
cd backend
pm2 start server.js --name loot-drop-backend
```

3. 设置开机自启
```bash
pm2 startup
pm2 save
```

4. 常用命令
```bash
pm2 logs loot-drop-backend    # 查看日志
pm2 restart loot-drop-backend # 重启
pm2 stop loot-drop-backend    # 停止
pm2 delete loot-drop-backend  # 删除
```

### 方式二：使用 Docker

创建 `Dockerfile`：
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
```

构建并运行：
```bash
docker build -t loot-drop-backend .
docker run -d -p 3001:3001 --name loot-drop-backend loot-drop-backend
```

### 方式三：使用 systemd（Linux）

创建服务文件 `/etc/systemd/system/loot-drop-backend.service`：
```ini
[Unit]
Description=Loot Drop Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/backend
ExecStart=/usr/bin/node server.js
Restart=always
Environment=NODE_ENV=production
Environment=PORT=3001
Environment=JWT_SECRET=your-secret-key-here

[Install]
WantedBy=multi-user.target
```

启用服务：
```bash
sudo systemctl daemon-reload
sudo systemctl enable loot-drop-backend
sudo systemctl start loot-drop-backend
```

## 环境变量

创建 `.env` 文件：

```env
PORT=3001
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## 数据库备份

### 备份数据库
```bash
cp backend/database/loot_drop.db backend/database/loot_drop.db.backup.$(date +%Y%m%d)
```

### 恢复数据库
```bash
cp backend/database/loot_drop.db.backup.20240101 backend/database/loot_drop.db
```

## 反向代理配置（Nginx）

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 安全建议

1. **修改默认密码**
   - 首次登录后立即修改 admin 密码
   - 使用强密码（至少 12 位，包含大小写字母、数字和符号）

2. **配置防火墙**
```bash
# 只允许特定 IP 访问管理接口
sudo ufw allow from your-trusted-ip to any port 3001
```

3. **启用 HTTPS**
   - 使用 Let's Encrypt 免费证书
   - 配置自动续期

4. **定期备份**
   - 设置自动备份脚本
   - 将备份存储到异地

5. **监控日志**
   - 定期检查审计日志
   - 关注异常登录和操作

## 性能优化

1. **数据库索引优化**
   - 为常用查询字段添加索引

2. **启用 Gzip 压缩**
   - 在 Nginx 或 Express 中配置

3. **使用 CDN**
   - 静态资源使用 CDN 加速

4. **限制请求频率**
   - 防止暴力攻击和 DDoS

## 故障排查

### 端口被占用
```bash
# 查找占用端口的进程
lsof -i :3001
# 或
netstat -tlnp | grep 3001

# 杀死进程
kill -9 <PID>
```

### 数据库权限问题
```bash
# 确保数据库文件可写
chmod 644 backend/database/loot_drop.db
chmod 755 backend/database
```

### 日志位置
- PM2: `~/.pm2/logs/`
- Systemd: `journalctl -u loot-drop-backend`
- 应用: 数据库 `audit_logs` 表

## 技术支持

如遇问题，请检查：
1. Node.js 版本是否兼容
2. 依赖是否完整安装
3. 端口是否被占用
4. 防火墙设置
5. 查看应用日志
