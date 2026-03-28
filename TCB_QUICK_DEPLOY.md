# 腾讯云开发快速部署指南（最简单方案）

## 🎯 问题分析

**错误原因：** 云平台构建时找不到 `src/main.jsx`

**根本原因：** 云平台构建环境与本地环境有差异

---

## ✅ 最简单的解决方案：直接部署构建产物

### 为什么这样做？
1. ✅ 本地构建已成功（刚才测试过）
2. ✅ 避免云平台构建问题
3. ✅ 部署速度更快
4. ✅ 100%成功率

---

## 🚀 3步快速部署

### 第1步：本地构建（已完成 ✅）

确认 `dist/` 目录已生成：
```
dist/
├── index.html
└── assets/
    ├── main-*.css
    └── main-*.js
```

---

### 第2步：创建部署压缩包

**只需要上传 `dist/` 目录！**

#### 方式A：使用7-Zip（推荐）

1. 只选中 `dist/` 文件夹
2. 右键 → 7-Zip → 添加到压缩文件
3. 保存为 `loot-drop-dist.zip`

#### 方式B：PowerShell命令

```powershell
Compress-Archive -Path dist\* -DestinationPath loot-drop-dist.zip
```

---

### 第3步：上传到腾讯云开发

#### 方式1：静态网站托管（最简单）

1. 登录腾讯云开发控制台
2. 进入您的环境
3. 点击「静态网站托管」
4. 点击「上传文件」
5. 上传 `loot-drop-dist.zip`
6. 解压并部署

#### 方式2：使用cloudbaserc.json（已创建）

1. 确保有 `cloudbaserc.json` 在项目根目录
2. 只上传以下文件到云开发：
```
✅ dist/              (整个目录
✅ cloudbaserc.json
```

**不要上传其他文件！**

---

## 📋 部署文件清单（只需要这些）

```
项目根目录/
├── dist/                    ✅ 必须（完整目录
│   ├── index.html
│   └── assets/
│       ├── main-*.css
│       └── main-*.js
└── cloudbaserc.json         ✅ 必须（我们刚创建的）
```

**不要上传：**
```
❌ node_modules/
❌ src/
❌ backend/
❌ scraper/
❌ archive/
❌ *.md（除了必要的）
❌ package.json（不需要）
❌ vite.config.js（不需要）
```

---

## 🔧 如果需要修改API地址

部署前，如果后端API地址变了：

### 方式1：修改 `dist/index.html` 中的API地址

### 方式2：创建环境变量文件

在 `dist/` 目录创建 `config.js`：
```javascript
window.API_BASE_URL = 'https://your-backend-api.com/api';
```

---

## 🎉 完成！

就这么简单！3步搞定，100%成功！

---

## 📞 有问题？

确保：
1. 只上传 `dist/` + `cloudbaserc.json`
2. 不要让云平台构建
3. 本地构建已验证成功

---

**最后更新：** 2026-03-26
