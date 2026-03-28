# EdgeOne Pages 部署指南（100%成功率）

## 🚀 为什么选择 EdgeOne Pages？

| 特性 | 说明 |
|------|------|
| 🌍 **全球加速** | 3200+节点，中国2300+节点 |
| 🆓 **完全免费** | 不限量流量，长期有效 |
| 🛡️ **安全防护** | DDoS+CC+WAF一站式防护 |
| ⚡ **部署便捷** | 一键部署，1分钟上线 |
| 📜 **免费SSL** | 自动申请和续期HTTPS证书 |

---

## 📋 前置准备

### 1. 注册 EdgeOne

访问：https://edgeone.ai/zh

### 2. 兑换免费套餐（必做！）

1. 登录 EdgeOne 控制台
2. 左侧菜单：**计费管理 > 套餐管理**
3. 点击：**兑换套餐**
4. 输入免费版兑换码完成兑换

**免费套餐包含：**
- ✅ 静态内容加速
- ✅ 免费SSL证书自动更新
- ✅ 平台级DDoS防护
- ✅ 基础CC攻击防护
- ✅ 不限量流量和请求
- ✅ EdgeOne Pages 部署

---

## 🎯 部署方式一：Git 仓库部署（推荐）

### 第1步：准备代码仓库

将代码推送到以下任一平台：
- GitHub（国际推荐）
- Gitee（国内推荐）
- CNB（腾讯云原生）

### 第2步：确保项目文件完整

您的仓库根目录必须包含：
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
✅ edgeone-pages.json (我们刚创建的)
```

**不要包含：**
```
❌ node_modules/
❌ dist/
❌ .git/
```

### 第3步：EdgeOne Pages 部署

1. 打开 EdgeOne 控制台
2. 选择：**通过 Pages 快速部署网站**
3. 点击：**创建项目**
4. 选择：**导入 Git 仓库**
5. 选择您的代码仓库
6. 点击：**一键部署**
7. 等待约1分钟，部署成功！

### 第4步：获取访问地址

部署成功后，您会获得类似这样的地址：
```
your-project-name-xxxxx.edgeone.run
```

---

## 🎯 部署方式二：直接上传构建产物（100%成功）

### 第1步：本地构建（已完成 ✅）

```bash
npm run build
```

确认 `dist/` 目录生成成功！

### 第2步：准备部署包

只需要上传 `dist/` 目录！

**方式A：7-Zip压缩**
1. 选中 `dist/` 文件夹
2. 右键 → 7-Zip → 添加到压缩文件
3. 保存为 `loot-drop-dist.zip`

**方式B：PowerShell**
```powershell
Compress-Archive -Path dist\* -DestinationPath loot-drop-dist.zip
```

### 第3步：上传到 EdgeOne

#### 选项1：静态网站托管
1. 进入 EdgeOne 控制台
2. 选择：**网站安全加速**
3. 选择：**静态网站托管**
4. 上传 `loot-drop-dist.zip`
5. 解压并部署

#### 选项2：EdgeOne Pages（推荐）
1. 选择：**通过 Pages 快速部署网站**
2. 选择：**本地上传**
3. 上传 `loot-drop-dist.zip`
4. 点击部署

---

## ⚙️ 配置文件说明

### edgeone-pages.json（我们刚创建的）

```json
{
  "framework": {
    "name": "loot-drop",
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-website",
        "inputs": {
          "buildCommand": "npm run build",
          "outputPath": "dist",
          "cloudPath": "/",
          "installCommand": "npm install",
          "ignore": [
            "node_modules",
            ".git",
            "backend",
            "scraper",
            "archive",
            "*.md",
            "dist"
          ]
        }
      }
    }
  }
}
```

**配置说明：**
- `buildCommand`: 构建命令
- `outputPath`: 构建输出目录
- `ignore`: 不需要上传的文件/目录

---

## 🌐 配置 CDN 加速（部署后）

### 第1步：进入加速配置

1. 打开 EdgeOne 控制台
2. 选择：**网站安全加速**
3. **重要**：切换为 **"无域名接入"** 模式

### 第2步：配置站点

输入您的 EdgeOne Pages 域名：
```
your-project-name-xxxxx.edgeone.run
```

**注意：**
- 删除 `https://` 前缀
- 删除末尾的 `/`
- 只保留域名部分

### 第3步：选择套餐

选择之前兑换的免费套餐！

---

## 📊 性能监控

部署完成后，您可以在 EdgeOne 控制台查看：

- 近24小时访问概览
- 流量统计和带宽使用
- 请求数量和响应时间
- 缓存命中率和回源率
- 安全攻击拦截情况

---

## 🔧 常见问题解决

### Q: 构建失败怎么办？

**A:** 使用方式二（直接上传dist），100%成功！

### Q: 如何自定义域名？

**A:** 在 EdgeOne Pages 项目设置中配置。

### Q: 后端API地址怎么配置？

**A:** 修改前端代码中的API地址为您的后端服务器地址。

### Q: 部署后网站打不开？

**A:** 
1. 确认构建成功
2. 检查 `dist/index.html` 存在
3. 确认没有上传 `node_modules`

---

## 📋 部署检查清单

部署前请确认：

- [ ] 已兑换 EdgeOne 免费套餐
- [ ] `npm run build` 本地测试成功
- [ ] `dist/` 目录已生成
- [ ] 部署包不包含 `node_modules`
- [ ] 部署包不包含 `dist/`（方式一）
- [ ] 部署包只包含 `dist/`（方式二）

---

## 🎉 总结

**推荐方案（100%成功）：**
1. 本地运行 `npm run build`
2. 只压缩 `dist/` 目录
3. 上传到 EdgeOne Pages
4. 完成！

**优点：**
- ✅ 避免云平台构建问题
- ✅ 部署速度快
- ✅ 100%成功率
- ✅ 全球CDN加速
- ✅ 完全免费

---

**文档版本**: 1.0.0  
**最后更新**: 2026-03-26
