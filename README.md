# 阿里云 ESA Pages 第四期项目

本项目包含10个基于 React 18 技术栈开发的创意 Web 应用，所有项目均采用统一的技术规范和项目结构，并适配阿里云 ESA Pages 平台部署。

## 技术规范

- **核心框架**: React 18
- **路由方案**: React Router
- **UI样式**: Tailwind CSS 3.4
- **状态管理**: React Hooks
- **数据持久化**: LocalStorage
- **构建工具**: Vite
- **图标库**: Lucide React

## 项目列表

| 项目名称 | 访问地址 | 功能描述 |
|---------|---------|---------|
| [U-Todo](./U-Todo/) | [访问](https://u-todo.5e61f340.er.aliyun-esa.net/) | 待办事项管理，支持优先级和分类 |
| [U-Notes](./U-Notes/) | [访问](https://u-notes.5e61f340.er.aliyun-esa.net/) | 笔记管理，支持分类和搜索 |
| [U-Music](./U-Music/) | [访问](https://u-music.5e61f340.er.aliyun-esa.net/) | 音乐播放器，您的私人音乐库 |
| [U-Recipes](./U-Recipes/) | [访问](https://u-recipes.5e61f340.er.aliyun-esa.net/) | 食谱管理，管理您的美食食谱 |
| [U-Workout](./U-Workout/) | [访问](https://u-workout.5e61f340.er.aliyun-esa.net/) | 健身记录，记录您的健身计划 |
| [U-Weather](./U-Weather/) | [访问](https://u-weather.5e61f340.er.aliyun-esa.net/) | 天气预报，实时天气信息 |
| [U-Passwords](./U-Passwords/) | [访问](https://u-passwords.5e61f340.er.aliyun-esa.net/) | 密码管理，安全管理您的密码 |
| [U-Projects](./U-Projects/) | [访问](https://u-projects.5e61f340.er.aliyun-esa.net/) | 项目管理，管理您的项目进度 |
| [U-Videos](./U-Videos/) | [访问](https://u-videos.5e61f340.er.aliyun-esa.net/) | 视频管理，管理您的视频资源 |
| [U-Settings](./U-Settings/) | [访问](https://u-settings.5e61f340.er.aliyun-esa.net/) | 系统设置，管理系统配置选项 |

## 项目特点

### 统一规范
- 所有项目遵循统一的目录结构
- 统一的命名规范和代码风格
- 统一的配置文件格式

### 数据管理
- 每个项目都有独立的 JSON 数据文件
- 使用 LocalStorage 进行数据持久化
- 测试数据存储在 `src/data/` 目录下

### 样式设计
- 采用明亮清新的配色方案
- 每个项目使用不同的主题色
- 响应式设计，完美适配各设备

### 部署配置
- 所有项目已配置 `esa.jsonc` 部署文件
- 包含 `.gitignore` 忽略 `node_modules` 和 `dist`
- 每个项目都有独立的 `提交.txt` 和 `README.md`

## 部署说明

所有项目均已配置为可在阿里云 ESA 平台部署，部署参数：

- **构建命令**: `npm install`
- **构建输出目录**: `./dist`
- **404处理策略**: 单页应用模式 (singlePageApplication)

## 技术栈详情

### 前端框架
- **React 18**: 最新的 React 版本，提供更好的性能和开发体验

### 开发工具
- **Vite**: 极速的前端构建工具，提供快速的开发服务器启动
- **Tailwind CSS**: 实用优先的 CSS 框架，快速构建现代化 UI

### 数据存储
- **LocalStorage**: 浏览器本地存储，无需后端服务
- **JSON 数据文件**: 测试数据统一管理，便于维护

### 图标库
- **Lucide React**: 轻量级的图标库，提供丰富的图标选择

## 项目结构

```
aliyun-esa-pages-fourth/
├── U-Todo/            # 待办事项管理
├── U-Notes/           # 笔记管理
├── U-Music/           # 音乐播放器
├── U-Recipes/         # 食谱管理
├── U-Workout/         # 健身记录
├── U-Weather/         # 天气预报
├── U-Passwords/       # 密码管理
├── U-Projects/        # 项目管理
├── U-Videos/          # 视频管理
├── U-Settings/        # 系统设置
├── aliyun.png         # 阿里云 ESA Logo
└── README.md          # 本文件
```

每个子项目的结构：
```
U-XXX/
├── src/
│   ├── components/    # 可复用的UI组件
│   ├── data/          # 数据文件(JSON格式)
│   ├── pages/         # 页面组件
│   ├── App.jsx        # 主应用组件
│   ├── App.css        # 应用样式
│   ├── index.css      # 全局样式
│   └── index.jsx      # 应用入口
├── package.json       # 项目依赖
├── esa.jsonc          # ESA部署配置
├── tailwind.config.js # Tailwind配置
├── vite.config.js     # Vite配置
├── .gitignore         # Git忽略文件
├── aliyun.png         # 阿里云Logo
├── README.md          # 项目说明
└── 提交.txt           # 提交信息
```

## 开发指南

### 环境要求
- Node.js >= 18.0.0
- npm 或 yarn

### 开发流程
1. 进入项目目录: `cd U-XXX`
2. 安装依赖: `npm install`
3. 启动开发服务器: `npm run dev`
4. 构建生产版本: `npm run build`
5. 预览构建结果: `npm run preview`

### 修改数据
- 编辑 `src/data/` 目录下的 JSON 文件
- 数据会自动加载到应用中

### 自定义样式
- 在 `tailwind.config.js` 中扩展配置
- 在 `src/index.css` 中添加自定义样式

## 许可证

所有项目均遵循 [MIT License](https://opensource.org/licenses/MIT)。

## 声明

所有项目均由阿里云 ESA 提供加速、计算和保护
