---
title: "MySQL binlog"
list: true
---

MySQL的二进制日志可以说是MySQL最重要的日志了，它记录了所有的DDL和DML（除了数据查询语句）语句，以事件形式记录，还包含语句所执行的消耗的时间，MySQL的二进制日志是事务安全型的。

## 恢复语法格式：

```sh
mysqlbinlog mysql-bin.0000xx | mysql -u $USERNAME -p $PASSWORD $DATABASE
```
常用选项：

```sh
--start-position=953                   # 起始pos点
--stop-position=1437                   # 结束pos点
--start-datetime="2013-11-29 13:18:54" # 起始时间点
--stop-datetime="2013-11-29 13:21:53"  # 结束时间点
--database=$DATABASE                     # 指定只恢复zyyshop数据库(只限本地log日志)
```

不常用选项：

```sh  
-u --user=name              # 连接到远程主机的用户名
-p --password[=password]        # 连接到远程主机的密码
-h --host=name              # 从远程主机上获取binlog日志
--read-from-remote-server   # 从某个MySQL服务器上读取binlog日志
```

总结：所谓恢复，就是让mysql将保存在binlog日志中指定段落区间的sql语句逐个重新执行一次而已。 