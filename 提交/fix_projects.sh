#!/bin/bash

# 项目列表
projects=("U-Todo" "U-Notes" "U-Music" "U-Recipes" "U-Workout" "U-Weather" "U-Passwords" "U-Projects" "U-Videos" "U-Settings")

echo "开始检查和修复所有项目..."
echo "================================"

for project in "${projects[@]}"; do
  echo ""
  echo "=== 检查 $project ==="

  # 检查项目目录是否存在
  if [ ! -d "$project" ]; then
    echo "✗ 项目目录不存在: $project"
    continue
  fi

  cd "$project"

  # 检查 package.json
  if [ ! -f "package.json" ]; then
    echo "✗ package.json 不存在"
  else
    echo "✓ package.json 存在"
  fi

  # 检查 index.html 中的入口文件引用
  if [ -f "index.html" ]; then
    if grep -q 'src/index.jsx' index.html; then
      echo "✓ index.html 引用正确"
    else
      echo "⚠ index.html 可能需要检查"
    fi
  else
    echo "✗ index.html 不存在"
  fi

  # 检查 src/index.jsx
  if [ -f "src/index.jsx" ]; then
    echo "✓ src/index.jsx 存在"
  else
    echo "✗ src/index.jsx 不存在"
  fi

  # 检查 src/App.jsx
  if [ -f "src/App.jsx" ]; then
    echo "✓ src/App.jsx 存在"
  else
    echo "✗ src/App.jsx 不存在"
  fi

  # 检查 src/pages/Home.jsx
  if [ -f "src/pages/Home.jsx" ]; then
    echo "✓ src/pages/Home.jsx 存在"
  else
    echo "✗ src/pages/Home.jsx 不存在"
  fi

  # 检查配置文件
  if [ -f "vite.config.js" ]; then
    echo "✓ vite.config.js 存在"
  else
    echo "✗ vite.config.js 不存在"
  fi

  if [ -f "tailwind.config.js" ]; then
    echo "✓ tailwind.config.js 存在"
  else
    echo "✗ tailwind.config.js 不存在"
  fi

  if [ -f "postcss.config.js" ]; then
    echo "✓ postcss.config.js 存在"
  else
    echo "✗ postcss.config.js 不存在"
  fi

  # 检查 data 目录
  if [ -d "src/data" ]; then
    echo "✓ src/data 目录存在"
  else
    echo "✗ src/data 目录不存在"
  fi

  # 检查是否已经有 node_modules
  if [ -d "node_modules" ]; then
    echo "✓ node_modules 已存在（可能已安装依赖）"
  else
    echo "⚠ node_modules 不存在（需要运行 npm install）"
  fi

  cd ..
done

echo ""
echo "================================"
echo "检查完成！"
echo ""
echo "下一步："
echo "1. 为每个项目运行: cd <项目名> && npm install"
echo "2. 然后运行: npm run dev"
echo ""
echo "或者使用 PROJECT_SETUP_GUIDE.md 中的批量执行方法"
