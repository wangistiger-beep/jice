# Loot Drop 网站克隆项目 - 实施计划

## 项目概述
继续复制 `https://www.loot-drop.io/` 网站的全部内容并翻译成中文，重点解决案例详情页缺失问题。

---

## [x] 任务 1: 安装 React Router 并配置路由系统
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 安装 react-router-dom 依赖
  - 配置基础路由结构
  - 创建首页和详情页路由
- **Success Criteria**:
  - 路由系统正常工作
  - 可以在首页和详情页之间导航
- **Test Requirements**:
  - `programmatic` TR-1.1: 路由可以正常跳转无错误
  - `human-judgement` TR-1.2: URL 显示正确的路径
- **Notes**: 使用 React Router v6 或更新版本

---

## [x] 任务 2: 扩展案例详情页数据结构设计
- **Priority**: P0
- **Depends On**: 任务 1
- **Description**: 
  - 在 startups.js 中扩展数据结构，包含完整的 5 个部分
  - 为每个案例添加详情信息
  - 保持向后兼容现有数据
- **Success Criteria**:
  - 数据结构完整包含所有必需字段
  - 现有功能不受影响
- **Test Requirements**:
  - `programmatic` TR-2.1: 数据结构符合 TypeScript 接口定义（或 JSDoc）
  - `human-judgement` TR-2.2: 数据内容完整且合理
- **Notes**: 以 WeWork 为第一个完整案例示例

---

## [x] 任务 3: 创建案例详情页组件
- **Priority**: P0
- **Depends On**: 任务 2
- **Description**: 
  - 创建 StartupDetail.jsx 组件
  - 实现 5 个主要部分的 UI
  - 添加返回首页功能
- **Success Criteria**:
  - 详情页包含所有 5 个部分
  - UI 风格与现有网站一致
- **Test Requirements**:
  - `programmatic` TR-3.1: 所有数据正确渲染
  - `human-judgement` TR-3.2: UI 美观、响应式
- **Notes**: 保持与现有 brutalist 设计风格一致

---

## [x] 任务 4: 更新 StartupCard 和 StartupGrid
- **Priority**: P0
- **Depends On**: 任务 3
- **Description**: 
  - 修改 StartupCard 点击跳转到详情页
  - 移除简单的模态框
  - 添加链接到详情页
- **Success Criteria**:
  - 点击卡片跳转到详情页
  - 从详情页可以返回首页
- **Test Requirements**:
  - `programmatic` TR-4.1: 点击卡片正确跳转
  - `human-judgement` TR-4.2: 用户体验流畅
- **Notes**: 保持现有卡片的视觉效果

---

## [x] 任务 5: 创建完整的 WeWork 案例数据
- **Priority**: P1
- **Depends On**: 任务 2
- **Description**: 
  - 为 WeWork 编写完整的 5 部分详情数据
  - 包含所有必需的字段
  - 确保内容准确
- **Success Criteria**:
  - WeWork 详情页完整展示
  - 所有部分内容完整
- **Test Requirements**:
  - `programmatic` TR-5.1: 所有数据字段完整
  - `human-judgement` TR-5.2: 内容准确合理
- **Notes**: 根据用户提供的结构创建

---

## [x] 任务 6: 完善 UI 和网站结构
- **Priority**: P1
- **Depends On**: 任务 4
- **Description**: 
  - 检查并完善导航栏
  - 添加页脚
  - 优化响应式布局
  - 添加相关案例功能
- **Success Criteria**:
  - 网站结构完整
  - 所有功能模块工作正常
- **Test Requirements**:
  - `programmatic` TR-6.1: 所有页面元素正常显示
  - `human-judgement` TR-6.2: 整体用户体验良好
- **Notes**: 参考原网站的结构

---

## [ ] 任务 7: 创建更多案例的完整数据
- **Priority**: P2
- **Depends On**: 任务 5
- **Description**: 
  - 为 Northvolt 创建完整数据
  - 为 FTX 创建完整数据
  - 为其他精选案例创建完整数据
- **Success Criteria**:
  - 至少 5 个案例有完整详情
- **Test Requirements**:
  - `programmatic` TR-7.1: 数据结构一致
  - `human-judgement` TR-7.2: 内容质量高
- **Notes**: 优先处理高知名度案例
