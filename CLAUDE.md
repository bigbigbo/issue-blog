# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码仓库中工作时提供指导。

Always responded in 中文

## 项目概览

这是一个基于 Next.js 16.3 Preview 的博客应用，使用 GitHub Issues 作为 CMS，并显示基于天文计算的中国二十四节气。该应用具有动态季节背景和简洁的响应式设计。

## 基本命令

### 开发
```bash
# 安装依赖（使用 pnpm）
pnpm install

# 使用 Turbopack 运行开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 运行代码检查
pnpm lint

# 运行 Storybook 进行组件开发
pnpm storybook

# 运行 Storybook 浏览器测试
pnpm exec vitest run
```

### 代码质量
```bash
# 代码检查和格式化会在提交前通过 Husky 自动运行
# 手动运行代码检查并自动修复
pnpm lint --fix

# 手动使用 Prettier 格式化
pnpm prettier --write .
```

## 架构与关键模式

### 整洁架构结构
代码库遵循整洁架构原则，具有清晰的关注点分离：

- **表示层** (`/components`): 包含最少业务逻辑的 React 组件
- **业务逻辑层** (`/core`): 服务、实体和业务规则
- **数据访问层** (`/core/datasources`): 外部 API 集成（GitHub Issues）

### 关键架构决策

1. **GitHub Issues 作为 CMS**: 博客文章作为 GitHub Issues 存储在仓库中
   - 通过 `.env.development` 中的 `GITHUB_REPO_OWNER` 和 `GITHUB_REPO_NAME` 进行配置
   - 需要在 `.env.local` 中配置 `GITHUB_ACCESS_TOKEN` 以访问 API

2. **节气系统**: 中国二十四节气的天文计算
   - 使用 `astronomy-engine` 进行精确的太阳位置计算
   - 基于当前节气的动态主题，包含季节色彩和诗词

3. **数据获取**: 使用 TanStack Query 进行服务器状态管理
   - 博客文章的无限滚动分页
   - 自动缓存和后台重新获取

4. **样式**: 使用 Tailwind CSS 4 和自定义主题配置
   - 基于节气的季节色彩方案
   - 移动优先的响应式设计

### 组件组织
```
/components
├── background-decorations/  # 动态背景系统
├── navbar/                  # 导航组件
├── profile/                 # 用户资料显示
├── solar-term/             # 节气相关组件
└── providers/              # React 上下文提供者
```

### 核心业务逻辑
```
/core
├── constants/              # 应用常量（节气数据）
├── services/               # 业务逻辑层
├── entities/               # 数据模型和转换
└── datasources/           # 外部 API 集成
```

## 环境配置

必需的环境变量：
- `GITHUB_REPO_OWNER`: GitHub 仓库所有者（默认：bigbigbo）
- `GITHUB_REPO_NAME`: GitHub 仓库名称（默认：issue-blog）
- `GITHUB_ACCESS_TOKEN`: GitHub API 访问令牌（添加到 `.env.local`）

## 开发指南

### 导入组织
ESLint 强制执行严格的导入顺序：
1. React 导入
2. 第三方库
3. 内部库 (`@/lib`)
4. 组件 (`@/components`)
5. 相对导入
6. Hooks (`@/hooks`)
7. 服务 (`@/services`)
8. 工具 (`@/utils`)
9. 类型 (`@/types`)
10. 其他内部导入
11. 样式导入
12. 资源导入

### TypeScript 配置
- 启用严格模式
- 需要一致的类型导入
- 禁用显式 `any` 类型规则（为了灵活性）

### 代码风格
- 使用 Tailwind CSS 类排序的 Prettier 格式化
- ESLint 配合 Next.js 和 TypeScript 配置
- Git hooks 在提交前运行代码检查和格式化

## 关键功能实现

### 节气显示
- 使用 `astronomy-engine` 进行实时天文计算
- 24 个节气及相关中国诗词和主题色彩
- 基于当前季节的动态背景动画

### 博客系统
- GitHub Issues 集成与无限滚动
- 使用 `markdown-to-jsx` 进行 Markdown 渲染
- 使用 Issue 标签进行博客文章分类

### 动态背景
- 使用 `motion` 的季节性粒子动画
- 基于主题的色彩方案
- 响应式设计调整

## 测试

- **单元测试**: 使用 Vitest 和浏览器集成
- **组件测试**: 使用 Storybook 10 和 addon-vitest
- **浏览器测试**: 可用的 Playwright 集成

通过 Storybook 界面运行测试，或配置 Vitest 进行命令行测试。

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
