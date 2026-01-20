# U-Todo 待办事项管理

U-Todo 是一个简洁高效的待办事项管理应用，帮助您轻松组织和跟踪日常任务。支持优先级设置、分类管理和本地存储。

## 声明

本项目由阿里云ESA提供加速、计算和保护  
![阿里云ESA](aliyun.png)

## 功能特性

- **任务管理** - 添加、完成、删除待办事项
- **优先级设置** - 高、中、低三级优先级分类
- **分类管理** - 工作、学习、健康、生活等多维度分类
- **数据持久化** - 使用 LocalStorage 本地存储数据
- **统计展示** - 实时显示任务完成情况
- **响应式设计** - 完美适配桌面和移动设备
- **明亮清新** - 绿色主题界面，清新舒适

## 技术栈

- **前端框架**: React 18
- **路由**: React Router
- **UI样式**: Tailwind CSS 3.4
- **状态管理**: React Hooks
- **数据存储**: LocalStorage
- **构建工具**: Vite
- **图标库**: Lucide React

## 安装和启动

### 1. 克隆项目

```bash
git clone <repository-url>
cd U-Todo
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

开发服务器将在 `http://localhost:5173` 启动。

### 4. 构建生产版本

```bash
npm run build
```

构建后的文件将位于 `dist/` 目录中。

### 5. 预览生产构建

```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # 可复用的UI组件
│   └── Navbar.jsx       # 导航栏组件
├── data/                # 数据文件
│   └── todos.json       # 待办事项初始数据
├── pages/              # 页面组件
│   └── Home.jsx         # 主页面
├── App.jsx             # 主应用组件
├── App.css             # 应用样式
├── index.css           # 全局样式
└── index.jsx           # 应用入口文件
```

## 部署

### 部署到阿里云ESA

项目已配置为可在阿里云ESA平台部署，配置文件 `esa.jsonc` 定义了部署参数：

- **构建命令**: `npm install`
- **构建输出目录**: `./dist`
- **404处理策略**: 单页应用模式

要部署到阿里云ESA，只需将项目推送到配置的仓库，ESA将自动构建和部署。

### 部署到 Vercel

1. 安装 Vercel CLI:

```bash
npm i -g vercel
```

2. 登录 Vercel:

```bash
vercel login
```

3. 部署项目:

```bash
vercel --prod
```

### 部署到 Netlify

1. 在项目根目录创建 `netlify.toml` 文件:

```toml
[build]
  command = "npm run build"
  publish = "dist"
  environment = { NODE_VERSION = "18" }
```

2. 使用 Netlify CLI 部署:

```bash
netlify deploy --prod
```

## 数据存储

本项目使用浏览器 localStorage 作为数据存储方案，所有任务数据均存储在用户本地浏览器中，无需后端服务。

## 开发

### 添加新功能

1. 在 `src/pages/` 中创建新页面组件
2. 在 `src/App.jsx` 中添加路由
3. 如需要，创建相应的组件

### 自定义样式

样式使用 Tailwind CSS 定义，可以在 `src/index.css` 中添加自定义样式，在 `tailwind.config.js` 中扩展配置。

## 故障排除

### 依赖安装问题

如果安装依赖时遇到问题，尝试清理缓存:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 构建错误

如果构建时出现错误，检查控制台输出以定位问题，通常需要检查 JavaScript 语法错误或导入/导出问题。

## 许可证

该项目遵循以下协议 [MIT license](https://opensource.org/licenses/MIT).
