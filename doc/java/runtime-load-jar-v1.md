---
title: 运行时动态加载JAR文件
---

```java
URL url = new URL("file:"+filePath);
URLClassLoader loader = new URLClassLoader( new URL[]{ url } );
Class class = loader.loadClass("demo.DemoClass");
Object demoObj= class.newInstance();
```