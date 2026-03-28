# 内容结构优化与可视化增强计划

## 项目概述
本计划将对 Loot Drop 网站的案例编辑器进行全面升级，包括内容结构优化、可视化集成、图片上传、AI 集成准备、成功/失败案例区分、审核界面优化等功能。

---

## [ ] 任务 1: 内容结构优化
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 更新案例数据结构，优化字段定义
  - 整合 Magic Ears 中国风格的内容框架
  - 实现关联扩展（相关案例）功能
  - 优化评估维度字段
- **Success Criteria**:
  - 新的数据结构支持所有要求的字段
  - 兼容现有的失败案例数据
  - 案例详情页能正确显示新结构
- **Test Requirements**:
  - `programmatic` TR-1.1: 验证数据结构包含所有新字段（基础信息、关键数据、深度分析、评估维度、重建策略、关联扩展）
  - `human-judgement` TR-1.2: 检查编辑器 UI 是否能正确显示和编辑所有新字段
- **Notes**:
  - 需要同时更新前端和后端的数据结构
  - 保持向后兼容性

## [ ] 任务 2: 可视化集成
- **Priority**: P0
- **Depends On**: 任务 1
- **Description**:
  - 集成 ECharts 可视化库
  - 实现数据图表自动生成（根据案例数据）
  - 实现编辑器与可视化的双向联动
  - 添加实时验证提示
  - 创建摘要卡片组件
- **Success Criteria**:
  - 根据输入数据自动生成图表
  - 修改文本时图表实时更新
  - 必填字段未填时显示明确提示
- **Test Requirements**:
  - `programmatic` TR-2.1: 验证图表组件能根据 formData 正确渲染
  - `programmatic` TR-2.2: 验证修改表单数据时图表会重新渲染
  - `human-judgement` TR-2.3: 验证可视化效果美观且信息清晰
- **Notes**:
  - 使用 ECharts 或 AntV G2
  - 图表类型：柱状图、折线图、饼图等

## [ ] 任务 3: 图片上传功能
- **Priority**: P1
- **Depends On**: None
- **Description**:
  - 创建前端图片上传组件（支持拖拽和选择）
  - 实现图片预览、重排序、删除功能
  - 限制每张案例最多 3 张图片
  - 后端添加图片处理路由（使用 Sharp 调整尺寸和优化）
  - 图片存储管理
- **Success Criteria**:
  - 用户能上传最多 3 张图片
  - 图片能预览、重排序、删除
  - 后端能正确处理和存储图片
- **Test Requirements**:
  - `programmatic` TR-3.1: 验证上传超过 3 张图片时会阻止并提示
  - `programmatic` TR-3.2: 验证图片能正确上传到后端并返回 URL
  - `human-judgement` TR-3.3: 验证图片预览和重排序交互流畅
- **Notes**:
  - 使用 multer 处理 multipart/form-data
  - 使用 Sharp 处理图片（压缩、调整尺寸）

## [ ] 任务 4: AI 集成准备
- **Priority**: P1
- **Depends On**: 任务 1
- **Description**:
  - 为长文本字段添加可展开/收起功能
  - 实现「一键 AI 润色」按钮占位
  - 预留 API 调用接口
  - 优化文本字段结构，便于 AI 处理
- **Success Criteria**:
  - 长文本字段支持展开/收起
  - AI 润色按钮有占位 UI
  - 接口预留完整
- **Test Requirements**:
  - `programmatic` TR-4.1: 验证文本字段超过一定长度时自动显示展开按钮
  - `human-judgement` TR-4.2: 验证展开/收起交互流畅
- **Notes**:
  - 暂不实现真实的 AI 调用，只做架构准备
  - 未来可集成 OpenAI、Claude 等

## [ ] 任务 5: 案例类型区分
- **Priority**: P1
- **Depends On**: 任务 1
- **Description**:
  - 在编辑器顶部添加案例类型选择器（成功/失败）
  - 创建成功案例的镜像框架（反转失败逻辑）
  - 根据类型动态显示/隐藏字段
  - 动态调整验证规则
- **Success Criteria**:
  - 可选择成功或失败案例
  - 不同类型显示不同的字段和提示
  - 验证规则随类型动态变化
- **Test Requirements**:
  - `programmatic` TR-5.1: 验证切换类型时表单字段正确更新
  - `human-judgement` TR-5.2: 验证成功案例的框架逻辑合理
- **Notes**:
  - 失败案例: 失败原因 → 成功要素
  - 保持相同的 UI 体验

## [ ] 任务 6: 管理审核界面
- **Priority**: P2
- **Depends On**: 任务 1, 任务 5
- **Description**:
  - 创建专业的表格视图审核页面
  - 实现行内编辑功能
  - 添加 AI 辅助编辑和润色按钮
  - 实现版本历史记录
- **Success Criteria**:
  - 管理员能在表格中查看案例
  - 支持行内编辑
  - 版本历史完整记录
- **Test Requirements**:
  - `programmatic` TR-6.1: 验证版本历史能正确记录修改
  - `human-judgement` TR-6.2: 验证表格视图清晰易读
- **Notes**:
  - 表格使用 react-table 或类似库
  - 版本历史使用 diff 显示差异

## [ ] 任务 7: 一致性与易用性
- **Priority**: P2
- **Depends On**: 任务 1-6
- **Description**:
  - 确保成功/失败编辑器体验一致
  - 完善响应式设计（移动端/桌面端）
  - 强化字段验证和错误提示
  - 实现自动保存功能（localStorage + 后端）
  - 防丢机制
- **Success Criteria**:
  - 所有组件响应式
  - 错误提示清晰友好
  - 自动保存功能正常工作
- **Test Requirements**:
  - `programmatic` TR-7.1: 验证自动保存间隔触发并保存到 localStorage
  - `human-judgement` TR-7.2: 验证在不同屏幕尺寸下 UI 布局合理
- **Notes**:
  - 自动保存间隔: 30秒
  - 使用 debounce 优化性能

---

## 技术栈建议

### 编辑器内核
- **推荐**: Tiptap (基于 ProseMirror) 或 Slate.js
- **理由**: 对结构化块（Block）处理能力最强，完美支持执行计划四阶段和双向联动

### 可视化库
- **推荐**: ECharts 或 AntV (G2)
- **理由**: 功能强大，文档完善，与 React 集成良好
- **状态管理**: 配合 React useState/useEffect 实现实时同步

### 后端图片处理
- **推荐**: Sharp (Node.js)
- **理由**: 高性能图片处理，支持调整尺寸、压缩、格式转换

### 数据校验
- **推荐**: JSON Schema (Zod 或 Joi)
- **理由**: 类型安全的 schema 校验，便于区分成功/失败案例的不同字段

---

## 里程碑

1. **M1 (核心功能)**: 完成任务 1-3 (内容结构、可视化、图片上传)
2. **M2 (增强功能)**: 完成任务 4-5 (AI 准备、案例类型)
3. **M3 (管理优化)**: 完成任务 6-7 (审核界面、一致性)

---

## 风险与注意事项

1. **向后兼容性**: 确保新结构不破坏现有数据
2. **性能**: 可视化和自动保存要注意性能优化
3. **移动端**: 优先保证桌面端，移动端可简化
4. **图片存储**: 考虑使用云存储（AWS S3、阿里云 OSS）而非本地文件
