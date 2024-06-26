# 第一阶段：构建应用
FROM node:18-alpine as builder

# 设置工作目录
WORKDIR /home/nestService

# 复制package.json和yarn.lock文件
COPY package.json yarn.lock ./

# 安装项目依赖
RUN yarn install

# 复制项目文件
COPY . .

# 构建项目
RUN yarn build

# 安装PM2
RUN yarn global add pm2

# 暴露端口
EXPOSE 3000

# 设置启动命令
CMD ["pm2-runtime", "start", "dist/main.js"]
