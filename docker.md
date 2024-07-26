# 停止所有容器

docker stop $(docker ps -aq)

# 删除所有容器

docker rm $(docker ps -aq)

# 停止某个容器

docker stop container-name

# 删除某个容器

docker rm container-name

# 删除所有未使用的资源（包括未使用的镜像、网络和卷）

docker system prune -a

# 删除所有未使用容器

docker system prune

### 只构建镜像

```
docker-compose  build

```

### 导出tar包

```
docker save -o nest-system.tar nest-image:latest


```

### 清理悬空镜像

```

docker rmi $(docker images -f "dangling=true" -q)

```

# 服务器启动

docker run -d -p 3000:3000 --name nest-system -e NODE_ENV=production nest-image:latest

# 查看日志，一般用来排查问题

docker logs container-name
