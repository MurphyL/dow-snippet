---
title: "Java 性能分析工具"
---

## [JPS - JVM Process Status](https://docs.oracle.com/en/java/javase/15/docs/specs/man/jps.html)

> list the instrumented JVMs on the target system

```sh
jps [ 选项 ] [ 远程主机ID ]
```

> 远程主机ID => [protocol:][[//]hostname][:port][/servername]

### 主要选项

- `-m`：输出Main方法的参数；
- `-l`：输出运行的主文件（`Jar`文件或者`Main Class`）；
- `-v`：输出`JVM`参数。

## 参考文档

- [Java 7 - JDK Tools and Utilities](https://docs.oracle.com/javase/7/docs/technotes/tools/index.html)
- [Java® Development Kit Version 15 Tool Specifications](https://docs.oracle.com/en/java/javase/15/docs/specs/man/index.html)
- [Java 性能分析工具，第 2 部分：Java 内置监控工具](https://developer.ibm.com/zh/articles/j-lo-performance-analysissy-tools2/)
- [Java 性能分析工具，第 3 部分：Java Mission Control](https://developer.ibm.com/zh/articles/j-lo-performance-analysissy-tools3/)
- [Java 应用性能调优实践](https://developer.ibm.com/zh/articles/j-lo-performance-tuning-practice/)
- [Linux 性能观测工具](http://www.brendangregg.com/Slides/Velocity2015_LinuxPerfTools.pdf)
- [JVM 优化经验总结](https://developer.ibm.com/zh/articles/j-lo-jvm-optimize-experience/)
