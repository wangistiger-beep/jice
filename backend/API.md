# Loot Drop API 文档

## 基础信息

- **Base URL**: `http://localhost:3001/api`
- **认证方式**: JWT Bearer Token
- **数据格式**: JSON

## 认证

### 注册新用户
```http
POST /auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

### 登录
```http
POST /auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@loot-drop.io",
    "role": "admin"
  }
}
```

### 获取当前用户信息
```http
GET /auth/me
Authorization: Bearer <token>
```

## 用户端 API

### 获取已发布的案例列表
```http
GET /cases
```

### 获取单个案例详情
```http
GET /cases/:id
```

### 获取我的提交
```http
GET /cases/my/submissions
Authorization: Bearer <token>
```

### 提交新案例
```http
POST /cases
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "案例标题",
  "logo": "🏢",
  "description": "简短描述",
  "content": "详细内容",
  "richContent": "富文本内容"
}
```

### 更新案例详情
```http
PUT /cases/:id/details
Authorization: Bearer <token>
Content-Type: application/json

{
  "profile_name_location": "项目名称与所属地",
  "profile_core_tech": "核心技术/定位",
  "profile_funding": "融资与背书",
  "profile_vision": "愿景与价值主张",
  "profile_key_data": "关键数据",
  "failure_fatal_flaw": "核心死因",
  "failure_market_context": "市场/行业背景",
  "failure_economic_logic": "经济逻辑",
  "failure_tech_limits": "物理/技术限制",
  "failure_scalability": "可扩展性",
  "pivot_concept": "转型核心概念",
  "pivot_insight": "洞察",
  "pivot_product_restructuring": "产品重构",
  "pivot_wedge": "切入点",
  "execution_tech_stack": "技术栈建议",
  "execution_phase1": "Phase 1 (MVP)",
  "execution_phase2": "Phase 2 (Validation)",
  "execution_phase3": "Phase 3 (Scaling)",
  "execution_phase4": "Phase 4 (Moat)",
  "monetization_revenue_streams": "收入流组合",
  "monetization_margin_analysis": "利润率分析",
  "monetization_exit_logic": "退出逻辑",
  "related_failures": "相关失败案例"
}
```

### 提交案例审核
```http
PUT /cases/:id/submit
Authorization: Bearer <token>
```

## 管理员 API

### 获取待审核用户
```http
GET /admin/users/pending
Authorization: Bearer <admin_token>
```

### 获取所有用户
```http
GET /admin/users
Authorization: Bearer <admin_token>
```

### 批准用户
```http
PUT /admin/users/:id/approve
Authorization: Bearer <admin_token>
```

### 拒绝用户
```http
PUT /admin/users/:id/reject
Authorization: Bearer <admin_token>
```

### 获取待审核案例
```http
GET /admin/cases/pending
Authorization: Bearer <admin_token>
```

### 批准案例
```http
PUT /admin/cases/:id/approve
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "reviewNotes": "审核意见"
}
```

### 拒绝案例
```http
PUT /admin/cases/:id/reject
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "reviewNotes": "审核意见"
}
```

### 获取统计数据
```http
GET /admin/statistics
Authorization: Bearer <admin_token>
```

### 获取审计日志
```http
GET /admin/audit-logs
Authorization: Bearer <admin_token>
```

## 状态码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 未认证 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 默认管理员账号

- 用户名: `admin`
- 密码: `admin123`
- 邮箱: `admin@loot-drop.io`

**⚠️ 重要提示**: 生产环境中请务必修改默认密码！
