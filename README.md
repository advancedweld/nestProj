### 参考

- [掘金 在线聊天室](https://juejin.cn/post/7295681529606832138)
- [github 在线聊天室](https://github.com/mcmcCat/mmcat-messaging-nest)
- [掘金 在线聊天室2](https://juejin.cn/post/7296089060833722383)

### 类验证器 https://docs.nestjs.com/pipes#class-validator

### 阿里云ubuntu安装docker: https://developer.aliyun.com/article/762674
 **直接用apt简单安装方法： https://zhuanlan.zhihu.com/p/675938110**

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## hints

### 生成新资源

```bash
$ nest g resource users  # users 是 资源名称
```

### 生成过滤器

```bash
$ nest g filter http-filter
```

### 生成拦截器

```bash
$ nest g interceptor http-interceptor
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```


* 部署可以用**pm2** 参考： https://juejin.cn/post/7346102132863189030
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- 中文网 - https://nest.nodejs.cn/middleware
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


### 构建镜像并启动容器

```
docker-compose up --build -d

```


### 导出tar包

```
docker save -o nest-system.tar nest-image:latest


```



## 在云服务器上启动

- **解压镜像tar包**

```
docker load -i /home/ubuntu/nest-system.tar

```

- **运行docker容器**

```
docker run -d -p 3000:3000 --name nest-system -e NODE_ENV=production nest-image:latest

```