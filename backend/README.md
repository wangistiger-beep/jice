# Loot Drop Backend System

功能完整的后端系统，支持管理员和用户两个独立模块，包含富文本内容管理系统。

## 功能特性

### 管理员后端
- ✅ 用户注册审核
- ✅ 案例发布审核
- ✅ 数据统计与导出
- ✅ 完善的后台管理界面
- ✅ 审计日志记录

### 用户后端
- ✅ 用户注册与登录认证
- ✅ 案例提交功能
- ✅ 案例进度查询
- ✅ 富文本编辑器

### 富文本系统
- ✅ 功能完备的富文本编辑器
- ✅ 案例内容一键上传
- ✅ 与原网站一致的内容格式

## 技术栈

- **后端框架**: Express.js
- **数据库**: SQLite3
- **认证**: JWT
- **密码加密**: bcryptjs
- **安全**: Helmet, CORS
- **日志**: Morgan

## 快速开始

### 1. 安装依赖

```bash
cd backend
npm install
```

### 2. 启动服务器

```bash
npm start
```

开发模式（带热重载）：

```bash
npm run dev
```

### 3. 访问服务器

服务器将在 `http://localhost:3001` 启动

### 4. 默认管理员账号

- 用户名: `admin`
- 密码: `admin123`

## 项目结构

```
backend/
├── database/
│   └── init.js              # 数据库初始化
├── middleware/
│   ├── auth.js            # 认证中间件
│   └── audit.js           # 审计日志中间件
├── routes/
│   ├── auth.js            # 认证路由
│   ├── admin.js           # 管理员路由
│   └── cases.js           # 案例路由
├── database/
│   └── loot_drop.db       # SQLite 数据库文件（自动生成）
├── server.js              # 主服务器文件
├── package.json
├── API.md                 # API 文档
├── DEPLOYMENT.md          # 部署指南
└── README.md              # 本文件
```

## API 文档

详细的 API 文档请查看 [API.md](./API.md)

## 部署指南

详细的部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 数据库设计

### 用户表 (users)
- id: 主键
- username: 用户名（唯一）
- email: 邮箱（唯一）
- password: 密码（加密）
- role: 角色（user/admin）
- status: 状态（pending/approved/rejected）
- created_at: 创建时间
- updated_at: 更新时间

### 案例表 (cases)
- id: 主键
- title: 标题
- logo: Logo
- description: 描述
- content: 内容
- rich_content: 富文本内容
- status: 状态（draft/pending/published/rejected）
- author_id: 作者 ID
- reviewer_id: 审核者 ID
- review_notes: 审核意见
- created_at: 创建时间
- updated_at: 更新时间
- reviewed_at: 审核时间

### 案例详情表 (case_details)
- id: 主键
- case_id: 案例 ID（外键）
- profile_*: 档案背景各字段
- failure_*: 失败剖析各字段
- pivot_*: 转型策略各字段
- execution_*: 执行规划各字段
- monetization_*: 盈利模型各字段
- related_failures: 相关失败案例

### 审计日志表 (audit_logs)
- id: 主键
- user_id: 用户 ID
- action: 操作类型
- entity_type: 实体类型
- entity_id: 实体 ID
- details: 详情（JSON）
- ip_address: IP 地址
- created_at: 创建时间

## 安全特性

- ✅ 密码 bcrypt 加密
- ✅ JWT 认证
- ✅ Helmet 安全头
- ✅ CORS 跨域配置
- ✅ SQL 注入防护
- ✅ 审计日志记录
- ✅ 权限控制
- ✅ 输入验证

## 开发说明

### 添加新路由

1. 在 `routes/` 目录下创建新的路由文件
2. 在 `server.js` 中引入并注册路由
3. 使用 `authenticateToken` 中间件保护需要认证的路由
4. 使用 `requireAdmin` 中间件保护管理员路由
5. 使用 `auditMiddleware` 记录审计日志

### 数据库迁移

直接修改 `database/init.js` 中的表结构定义

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request
