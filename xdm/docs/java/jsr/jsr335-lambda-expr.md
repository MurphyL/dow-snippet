---
title: Java8 Lambda
list: false
---

`Lambda`表达式，也可称为闭包，它允许把函数作为一个方法的参数。

`Lambda`表达式的基本语法是：

```java
(parameters) -> expression
// 或
(parameters) ->{ statements; }
```

- 可选类型声明：不需要声明参数类型，编译器可以统一识别参数值。
- 可选的参数圆括号：一个参数无需定义圆括号，但多个参数需要定义圆括号。
- 可选的大括号：如果主体包含了一个语句，就不需要使用大括号。
- 可选的返回关键字：如果主体只有一个表达式返回值则编译器会自动返回值，大括号需要指定明表达式返回了一个数值。

### Functional Interface

函数式接口(Functional Interface)就是一个有且仅有一个抽象方法，但是可以有多个非抽象方法的接口。

函数式接口可以被隐式转换为 lambda 表达式，可以对现有的函数友好地支持 lambda。

JDK 1.8 之前已有的函数式接口：

|  函数式接口   | 作用 | 注释  |
|  ----  | ----  | ----  |
| java.lang.Runnable |	多线程任务实现 | 无返回值 |
| java.util.concurrent.Callable | 多线程实现 | 有返回值 |
| java.util.Comparator | 比较器 | 比较两个参数 |

JDK 1.8 新增加的函数接口：

java.util.function 它包含了很多类，用来支持 Java的 函数式编程，该包中的函数式接口有：

|  函数式接口   | 作用 | 注释  |
|  ----  | ----  | ----  |
| Consumer	| 代表了接受一个输入参数并且无返回的操作 | 消费者，无返回值 |
| Function	| 接受一个输入参数，返回一个结果。 | 将一个结果转换为另外一个 |
| Predicate	| 接受一个输入参数，返回一个布尔值结果。 | 断言，校验参数 |
| Supplier	| 无参数，返回一个结果。 | 供应商，获取一个结果 |


## 参考资料

- [Java 8 - 函数编程（Lambda表达式）](https://www.pdai.tech/md/java/java8/java8-stream.html)
- [JSR 335: Lambda Expressions for the Java Programming Language](https://jcp.org/en/jsr/detail?id=335)