---
title: "Debian系发行版包管理"
icon: "linux"
---

### 软件源管理

#### 软件源配置文件

```sh
sudo nano /etc/apt/sources.list
```

#### 清理软件源缓存

```sh
sudo apt-get clean
sudo apt-get autoclean
sudo apt-get autoremove
```

#### 更新软件源缓存

```sh
# 软件源刷新
sudo apt-get update 

# 软件升级
sudo apt-get upgrade

# 版本升级
sudo apt-get dist-upgrade
```

### 软件包管理

#### 安装软件包

```sh
# 从远端安装软件包
sudo apt-get install $PKG_NAME

# 从本地文件安装软件包
sudo dpkg -i $PKG_NAME
```

#### 删除软件包

```sh
sudo apt-get remove $PKG_NAME

# 删除软件包和配置文件
sudo apt-get purge $PKG_NAME
```

### 错误处理

> 按照清华镜像站的说明修改文件内容后，apt-get update报错：Package ca-certificates is not available, but is referred to by another package.

1. 修改源配置中的`https`为`http`；
1. `apt update`；
1. `apt install ca-certificates`；
1. 可以切换到`https`版本的`apt`配置了。

### 参考资料

- [阿里云官方镜像站](https://developer.aliyun.com/mirror/)
- [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/docker-ce/)
- [DistroWatch - Package Management](https://distrowatch.com/dwres.php?resource=package-management)