---
title: "Alpine Linux 初始化"
---

> 用以构建`Docker`镜像的最佳选择：小巧、安全、简单。

## 修改软件源

```sh
# 修改软件源
sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
# 更新软件源
apk update
```

## 安装软件包

``` sh
su root 	# WSL中需要切换到 root 用户
apk add git
```