---
title: "Alpine Linux 初始化"
---

## 修改软件源

```sh
sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
```

## 安装软件包

``` sh
su root # 切换用户
apk add git
```