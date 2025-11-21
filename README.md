# FertilityBuddy - IVF AI 患者助手

一个为 IVF 患者提供 24/7 支持的 AI 助手应用，提供日程管理、用药指导、情感支持和知识科普。

## 功能特性

### ✅ MVP 已实现功能

1. **AI 对话助手**
   - 使用 Claude API 提供智能对话
   - 温暖、专业的语气
   - 中英文支持
   - 对话历史保存

2. **日程提醒**
   - 用药提醒
   - 检查预约
   - 自定义事项
   - 完成状态追踪

3. **知识库**
   - IVF 相关知识文章
   - 分类浏览
   - 搜索功能
   - 常见问题解答

4. **情绪记录**
   - 每日情绪记录
   - 情绪趋势可视化
   - 备注和日记
   - 本周统计

5. **用户认证**
   - 邮箱注册/登录
   - 用户资料管理
   - Supabase 认证集成

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI 库**: React 18
- **样式**: Tailwind CSS
- **组件**: shadcn/ui
- **数据库**: Supabase (PostgreSQL)
- **AI**: Anthropic Claude API (claude-sonnet-4)
- **认证**: Supabase Auth
- **状态管理**: React Hooks + Zustand
- **日期处理**: date-fns

## 开始使用

### 前置要求

- Node.js 18+
- npm 或 yarn
- Supabase 账号
- Anthropic API 密钥

### 安装步骤

1. **克隆仓库**
```bash
git clone <repository-url>
cd ivf-assist
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**

复制 `.env.example` 到 `.env.local` 并填写以下信息:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Anthropic Claude API
ANTHROPIC_API_KEY=your_claude_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **设置数据库**

在 Supabase 中运行 `supabase-schema.sql` 文件来创建所需的表和配置:

```bash
# 在 Supabase SQL Editor 中执行 supabase-schema.sql
```

5. **启动开发服务器**
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
ivf-assist/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # 认证相关页面
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/       # 主应用页面
│   │   │   ├── chat/          # AI 对话
│   │   │   ├── schedule/      # 日程管理
│   │   │   ├── knowledge/     # 知识库
│   │   │   ├── mood/          # 情绪记录
│   │   │   ├── profile/       # 个人资料
│   │   │   └── welcome/       # 欢迎页面
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # 认证 API
│   │   │   ├── chat/          # 对话 API
│   │   │   ├── reminders/     # 提醒 API
│   │   │   ├── mood/          # 情绪 API
│   │   │   ├── knowledge/     # 知识库 API
│   │   │   └── user/          # 用户 API
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/            # React 组件
│   │   ├── ui/               # UI 基础组件
│   │   ├── chat/             # 对话组件
│   │   ├── schedule/         # 日程组件
│   │   ├── mood/             # 情绪组件
│   │   ├── knowledge/        # 知识库组件
│   │   └── navigation.tsx    # 导航组件
│   └── lib/                  # 工具函数和配置
│       ├── supabase.ts       # Supabase 客户端
│       ├── claude.ts         # Claude API 集成
│       └── utils.ts          # 工具函数
├── public/                   # 静态资源
├── supabase-schema.sql      # 数据库 Schema
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## 数据库 Schema

主要表结构:

- **users**: 用户信息
- **conversations**: 对话历史
- **reminders**: 提醒事项
- **mood_logs**: 情绪记录
- **knowledge_articles**: 知识库文章

详细 Schema 请查看 `supabase-schema.sql` 文件。

## API 端点

### 认证
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

### 对话
- `POST /api/chat` - 发送消息
- `GET /api/chat/history` - 获取对话历史

### 提醒
- `GET /api/reminders` - 获取所有提醒
- `POST /api/reminders` - 创建提醒
- `PATCH /api/reminders/[id]` - 更新提醒
- `DELETE /api/reminders/[id]` - 删除提醒

### 情绪
- `GET /api/mood` - 获取情绪记录
- `POST /api/mood` - 保存情绪记录

### 知识库
- `GET /api/knowledge` - 获取知识文章

### 用户
- `GET /api/user/profile` - 获取用户资料
- `PATCH /api/user/profile` - 更新用户资料

## 开发指南

### 添加新功能

1. 在 `src/app/(dashboard)` 中创建新页面
2. 在 `src/app/api` 中创建相应的 API 路由
3. 在 `src/components` 中创建 UI 组件
4. 更新导航栏（如需要）

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 配置
- 组件使用 shadcn/ui 风格
- API 路由包含错误处理

## 部署

### Vercel 部署（推荐）

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 部署

### 其他平台

支持任何支持 Next.js 的平台，如：
- Netlify
- Cloudflare Pages
- Railway

## 待办事项（后续版本）

- [ ] 完善用户认证（Magic Link）
- [ ] 推送通知（PWA）
- [ ] 伴侣账号功能
- [ ] 数据导出功能
- [ ] 社区功能
- [ ] 多语言支持
- [ ] Native App

## 注意事项

⚠️ **重要提醒**:
- 本应用仅提供信息和支持，不能替代医疗建议
- 所有医疗决策应咨询专业医生
- 紧急情况请立即联系医疗机构

## 许可证

MIT License

## 贡献

欢迎提交 Issues 和 Pull Requests！

## 支持

如有问题，请联系：[联系方式]

---

**版本**: MVP v1.0
**最后更新**: 2025年11月
