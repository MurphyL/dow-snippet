---
title: "Java SPI 机制"
list: false
---

在`src/main/resources/`下建立`/META-INF/services`目录下新增一个接口命名的文件`demo.DemoInterface`的文件，内容是要应用的实现类，每行一个类。

```text
demo.DemoInterfaceImpl
```

使用`ServiceLoader`来加载配置文件中指定的实现：

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