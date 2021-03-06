---
title: "Shell 脚本开发笔记"
icon: "curl"
list: true
---

## Shebang

在脚本第一行加一个`#!`行的做法叫做`shebang`或者`hashbang`。

```sh
#!/usr/bin/env ruby
```

## `Bash`的错误处理

如果脚本里面有运行失败的命令（返回值非0），`Bash`默认会继续执行后面的命令。

这种行为很不利于脚本安全和除错。实际开发中，如果某个命令失败，往往需要脚本停止执行，防止错误累积。这时，一般采用下面的写法。

```sh
command || exit 1
```

上面的写法表示只要command有非零返回值，脚本就会停止执行。

如果停止执行之前需要完成多个操作，就要采用下面三种写法。

```sh
# 写法一
command || { echo "command failed"; exit 1; }
# 写法二
if ! command; then echo "command failed"; exit 1; fi
# 写法三
command
if [ "$?" -ne 0 ]; then echo "command failed"; exit 1; fi
```

另外，除了停止执行，还有一种情况。如果两个命令有继承关系，只有第一个命令成功了，才能继续执行第二个命令，那么就要采用下面的写法。

```sh
	command1 && command2
```

上面这些写法多少有些麻烦，容易疏忽。`set -e`从根本上解决了这个问题，它使得脚本只要发生错误，就终止执行。

`set -e`根据返回值来判断，一个命令是否运行失败。但是，某些命令的非零返回值可能不表示失败，或者开发者希望在命令失败的情况下，脚本继续执行下去。这时可以暂时关闭`set -e`，该命令执行结束后，再重新打开`set -e`。

`set -e`有一个例外情况，就是不适用于管道命令。

所谓管道命令，就是多个子命令通过管道运算符（|）组合成为一个大的命令。`Bash`会把最后一个子命令的返回值，作为整个命令的返回值。也就是说，只要最后一个子命令不失败，管道命令总是会执行成功，因此它后面命令依然会执行，`set -e`就失效了。

`set -o pipefail`用来解决这种情况，只要一个子命令失败，整个管道命令就失败，脚本就会终止执行。

`set`命令的上面这四个参数，一般都放在一起使用。

```sh
# 写法一
set -euxo pipefail

# 写法二
set -eux
set -o pipefail
```

这两种写法建议放在所有 `Bash`脚本的头部。

另一种办法是在执行`Bash`脚本的时候，从命令行传入这些参数。

```sh
sh -euxo pipefail script.sh
```

## Shell编程技巧

```sh
set -o xtrace / set -x
set -o nounset / set -u
```

在默认情况下，遇到不存在的变量，会忽略并继续执行，而这往往不符合预期，加入该选项，可以避免恶果扩大，终止脚本的执行。

画外音：有些变量名的手误，会让人崩溃的调试半天，通过这个方式，这类手误秒发现。

```sh
set -o errexit / set -e
```

在默认情况下，遇到执行出错，会跳过并继续执行，而这往往不符合预期，加入该选项，可以避免恶果扩大，终止脚本的执行。

画外音：有些`Linux`命令，例如`rm`的`-f`参数可以强制忽略错误，此时脚本便无法捕捉到`errexit`，这样的参数在脚本里是不推荐使用的。这两个选项，都符合`fail fast`设计理念。


使用`$()`代替(反单引号)

1. `$()`能够支持内嵌；
2. `$()`不用转义；

`echo`不是唯一的调试方法，可以用`-n`对脚本进行语法检查；可以用`-v`跟踪脚本里的每个命令的执行；可以用`-x`跟踪脚本里的每个命令的执行，并附加扩充信息。

### 保证进程后台执行：

```sh
# 后台运行脚本
nohup xxx &

# 在 Shell 脚本中获取进程 ID
echo $! > pid
```

### 判断文件夹是否存在

通过`-d "test"`来判断文件夹是否存在：

```sh
if [ -d 'test' ]; then
      echo "Git仓库存在"
else 
      echo "Git仓库不存在"
fi
```

## 常用工具

- shellcheck
- cloc - 代码统计工具，能够统计代码的空行数、注释行、编程语言。

## 参考资料

- [Linux Shell--判断文件夹是否存在](https://cloud.tencent.com/developer/article/1406056)
- [Linux shell 的实用小技巧](https://labuladong.gitbook.io/algo/di-wu-zhang-ji-shu-wen-zhang-xi-lie/linuxshell-ji-qiao)
