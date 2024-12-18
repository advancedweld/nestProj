#!/bin/bash

# 定义镜像名称常量
IMAGE_NAME="nest-image"
IMAGE_TAG="latest"
CONTAINER_NAME="nest-container"
IMAGE_FILE="app.tar"

# 检查是否有同名正在运行的容器
if docker ps | grep -q "$CONTAINER_NAME"; then
  echo "发现同名容器正在运行，请先停止或移除该容器。"
  exit 1
fi

# 加载镜像
docker load -i $IMAGE_FILE

# 检查镜像是否成功加载
if docker images | grep -q "$IMAGE_NAME"; then
  echo "镜像加载成功，启动容器..."
  docker run -d -p 3000:3000 --name $CONTAINER_NAME -e NODE_ENV=production $IMAGE_NAME:$IMAGE_TAG
else
  echo "镜像加载失败或未找到指定的镜像标签。"
fi