# 内网穿透快速启动指南

## 🚀 方案一：ngrok（5分钟快速开始）

### 步骤1：下载安装

访问：https://ngrok.com/download

下载Windows版本并解压

### 步骤2：注册获取Token

1. 访问：https://ngrok.com/
2. 注册免费账号
3. 访问：https://dashboard.ngrok.com/get-started/your-authtoken
4. 复制你的 Authtoken

### 步骤3：配置Token

在ngrok目录打开命令行：

```bash
ngrok config add-authtoken <你的token>
```

### 步骤4：启动隧道

**打开两个命令行窗口：**

**窗口1 - 启动前端隧道：**
```bash
ngrok http 5173
```

**窗口2 - 启动后端隧道：**
```bash
ngrok http 3001
```

### 步骤5：获取公网地址

启动后会显示：
```
Forwarding  https://xxxx-xx-xx-xx-xx.ngrok-free.app -> http://localhost:5173
Forwarding  https://yyyy-yy-yy-yy-yy.ngrok-free.app -> http://localhost:3001
```

**把前端地址分享给其他人访问！**

---

## 📝 注意事项

### 前端API地址修改

如果使用ngrok，需要修改前端的API配置：

1. 找到前端的API配置文件
2. 将 `http://localhost:3001` 改为你的ngrok后端地址

或者使用环境变量配置。

---

## 🔒 安全建议

1. **不要长期运行** - 测试完及时关闭
2. **敏感数据保护** - 不要在测试环境存放真实敏感数据
3. **定期重启** - 免费版ngrok重启后地址会变，正好重新生成
4. **使用HTTPS** - ngrok默认提供HTTPS，确保安全

---

## 💡 其他方案参考

### 花生壳（国内推荐）
- 官网：https://hsk.oray.com/
- 优点：国内速度快，免费域名
- 适合：国内用户访问

### Cloudflare Tunnel（推荐长期）
- 官网：https://developers.cloudflare.com/cloudflare-one/
- 优点：完全免费，永久域名，CDN加速
- 适合：有Cloudflare账号，长期使用

### frp（自建）
- 官网：https://github.com/fatedier/frp
- 优点：完全可控，性能最好
- 需要：一台有公网IP的云服务器

---

## 🎯 快速测试

现在就用ngrok试试：

1. 确保前后端服务器在运行
2. 打开两个ngrok窗口
3. 分享地址给朋友测试！

祝你使用愉快！ 🎉
