---
title: 运行时动态加载 JAR 文件
---

运行时动态加载 JAR 文件。

```java
URL url = new URL("file:"+filePath);
URLClassLoader loader = new URLClassLoader( new URL[]{ url } );
Class class = loader.loadClass("demo.DemoClass");
Object demoObj= class.newInstance();
```

## 参考资料

- [Java 类的热替换 —— 概念、设计与实现](https://developer.ibm.com/zh/articles/j-lo-hotswapcls/)