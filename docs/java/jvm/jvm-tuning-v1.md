---
title: "JVM 诊断/调优工具"
list: true
---

## `Java` 性能分析方法

围绕`Java`性能优化，有两种最基本的分析方法：现场分析法和事后分析法。

## `Java` 调试工具

- jcmd：打印一个 Java 进程的类，线程以及虚拟机信息。适合用在脚本中。使用 jcmd – h 来查看使用方法。
- jconsole：提供 JVM 活动的图形化展示，包括线程使用，类使用以及垃圾回收（GC）信息。
- jhat：帮助分析内存堆存储。
- jmap：提供 JVM 内存使用信息，适用于脚本中。
- jinfo：访问 JVM 系统属性，同时可以动态修改这些属性。
- jstack：提供 Java 进程内的线程堆栈信息。
- jstat：提供 Java 垃圾回收以及类加载信息。

## `Java` 应用诊断工具

- JConsole
- JVisualVM
- JDK Mission Control
- Eclipse Memory Analyzer

## Java 调试进阶工具

- BTrace
- Greys
- Arthas
- javOSize
- JProfiler

## 压力测试工具

- JMeter
- Apache Benchmark

## 参考文档

- [`Java`应用性能调优实践](https://developer.ibm.com/zh/languages/java/articles/j-lo-performance-tuning-practice/)
- [调试排错 - `Java`问题排查：工具单](https://www.pdai.tech/md/java/jvm/java-jvm-debug-tools-list.html)
- [Java 7 - JDK Tools and Utilities](https://docs.oracle.com/javase/7/docs/technotes/tools/index.html)
- [Java® Development Kit Version 15 Tool Specifications](https://docs.oracle.com/en/java/javase/15/docs/specs/man/index.html)
- [Java 性能分析工具，第 2 部分：Java 内置监控工具](https://developer.ibm.com/zh/articles/j-lo-performance-analysissy-tools2/)
- [Java 性能分析工具，第 3 部分：Java Mission Control](https://developer.ibm.com/zh/articles/j-lo-performance-analysissy-tools3/)
- [Java 应用性能调优实践](https://developer.ibm.com/zh/articles/j-lo-performance-tuning-practice/)
- [Linux 性能观测工具](http://www.brendangregg.com/Slides/Velocity2015_LinuxPerfTools.pdf)
- [JVM 优化经验总结](https://developer.ibm.com/zh/articles/j-lo-jvm-optimize-experience/)