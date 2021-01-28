---
title: Docker Alipne Linux 镜像
---

### 设置镜像时区

```Dockerfile
RUN apk update --no-cache && apk add --no-cache ca-certificates tzdata
ENV TZ Asia/Shanghai
```

### 安装JDK

```Dockerfile
# installing JCE
RUN cd ${JAVA_HOME}/jre/lib/security &&\
    wget --header="Cookie: oraclelicense=accept-securebackup-cookie" -O jce_policy-8.zip http://download.oracle.com/otn-pub/java/jce/8/jce_policy-8.zip &&\
    unzip -o -j jce_policy-8.zip UnlimitedJCEPolicyJDK8/*.jar &&\
    rm -f jce_policy-8.zip
```

## 参考

- [使用 Alpine 作为基础镜像时可能会遇到的常见问题的解决方法](https://mozillazg.com/2020/03/use-alpine-image-common-issues.rst.html)
- [Dockerfile - OpenJDK 8](https://github.com/docker-library/openjdk/blob/master/8/jdk/buster/Dockerfile)