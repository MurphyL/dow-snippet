---
title: "OLAP - 窗口函数"
---

> 窗口函数是从`OLAP`场景延展开来的，因此并非所有的数据库引擎都有良好的支持。

```txt
<窗口函数> over (partition by <用于分组的列名> order by <用于排序的列名>)
```