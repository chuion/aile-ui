#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

if [ -z "$GITHUB_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:chuion/aile-ui.git
else
  msg='来自github actions的自动部署'
  githubUrl=https://chuion:${GITHUB_TOKEN}@github.com/chuion/aile-ui.git
  git config --global user.name "chuion"
  git config --global user.email "mr.chuion@gmail.com"
fi
git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master:gh-pages # 推送到github gh-pages分支

cd -
rm -rf docs/.vuepress/dist