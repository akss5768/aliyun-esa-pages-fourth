#!/bin/bash

# 项目列表
projects=("U-Todo" "U-Notes" "U-Music" "U-Recipes" "U-Workout" "U-Weather" "U-Passwords" "U-Projects" "U-Videos" "U-Settings")

# 检查每个项目
for project in "${projects[@]}"; do
  echo "=== 检查 $project ==="
  
  # 检查 package.json
  if [ -f "$project/package.json" ]; then
    echo "✓ package.json 存在"
  else
    echo "✗ package.json 不存在"
  fi
  
  # 检查主要源文件
  if [ -f "$project/src/main.jsx" ]; then
    echo "✓ src/main.jsx 存在"
  else
    echo "✗ src/main.jsx 不存在"
  fi
  
  if [ -f "$project/src/App.jsx" ]; then
    echo "✓ src/App.jsx 存在"
  else
    echo "✗ src/App.jsx 不存在"
  fi
  
  if [ -f "$project/src/pages/Home.jsx" ]; then
    echo "✓ src/pages/Home.jsx 存在"
  else
    echo "✗ src/pages/Home.jsx 不存在"
  fi
  
  if [ -f "$project/index.html" ]; then
    echo "✓ index.html 存在"
  else
    echo "✗ index.html 不存在"
  fi
  
  if [ -f "$project/vite.config.js" ]; then
    echo "✓ vite.config.js 存在"
  else
    echo "✗ vite.config.js 不存在"
  fi
  
  echo ""
done
