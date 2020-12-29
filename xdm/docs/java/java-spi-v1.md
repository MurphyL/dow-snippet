---
title: "Java SPI 机制"
list: false
---

`SPI`全称为`Service Provider Interface`，是`JDK`内置的一种服务提供发现机制。`SPI`是一种动态替换发现的机制， 比如有个接口，想运行时动态的给它添加实现，你只需要添加一个实现。

在`src/main/resources/`下建立`/META-INF/services`目录下新增一个接口命名的文件`demo.DemoInterface`的文件，内容是要应用的实现类，每行一个类。

```text
demo.DemoInterfaceImpl
```

使用`java.util.ServiceLoader`来加载配置文件中指定的实现：

```java
// 加载实现类
ServiceLoader<DemoInterface> shouts = ServiceLoader.load(DemoInterface.class);

// 遍历实现类
for (DemoInterface: di) {
    di.callMethod();  // 方法调用
}
```

## 参考资料

- [Java常用机制 - SPI机制](https://www.pdai.tech/md/java/advanced/java-advanced-spi.html)