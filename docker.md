# 停止所有容器
docker stop $(docker ps -aq)

# 删除所有容器
docker rm $(docker ps -aq)

# 停止某个容器
docker stop container-name

# 删除所有未使用的资源（包括未使用的镜像、网络和卷）
docker system prune -a


# 删除所有未使用容器
docker system prune

# 服务器启动
docker run -d -p 10001:10001 --name nest-system -e NODE_ENV=production nest-image:latest


# 查看日志，一般用来排查问题
docker logs container-name