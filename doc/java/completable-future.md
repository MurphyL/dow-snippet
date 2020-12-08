---
title: "CompletableFuture - 异步任务的处理"
---

所谓异步调用其实就是实现一个可无需等待被调用函数的返回值而让操作继续运行的方法。在 Java 语言中，简单的讲就是另启一个线程来完成调用中的部分计算，使调用继续运行或返回，而不需要等待计算结果。但调用者仍需要取线程的计算结果。

## 参考资料

- [通过实例理解 JDK8 的 CompletableFuture](https://developer.ibm.com/zh/articles/j-cf-of-jdk8/)