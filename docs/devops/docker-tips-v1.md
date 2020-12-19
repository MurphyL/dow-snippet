---
title: Docker 使用笔记
list: true
---

容器是一个可部署的软件单元，可在进程级别提供隔离。每个应用程序及其环境都可以在一个隔离的环境中运行。容器向每个服务公开不同的环境。您可以自动化部署、扩展和管理容器化的应用程序。

```sh
# 拉取镜像
docker pull alpine

# 执行 Alpine Linux 镜像
docker run --rm -it alpine
```

## `docker-compose`

```sh
docker-compose up -d
```

## `Docker` 镜像

```sh
https://registry.docker-cn.com
https://hub-mirror.c.163.com/   # 网易
https://mirror.baidubce.com/    # 百度
```

## 参考资料

- [IBM Developer - 容器入门](https://developer.ibm.com/zh/gettingstarted/containers/)