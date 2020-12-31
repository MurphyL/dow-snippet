---
title: "MySQL 使用笔记"
icon: 'mysql'
list: true
---

## 探索表结构

```sql
/** 显示表结构 **/
{ DESC/DESCRIBE } demo_table;

/** 显示建表语句 - https://dev.mysql.com/doc/refman/8.0/en/show-create-table.html **/
SHOW CREATE TABLE demo_table;

/** 显示表字段以及字段注释 - https://dev.mysql.com/doc/refman/8.0/en/show-columns.html **/
SHOW [ FULL ] { COLUMNS/FIELDS } FROM demo_table;
```

## `values`语句

> 用于构造二维表结构

```sql
VALUES ROW(1, 2, 3), ROW(4, 5, 6), ROW(7, 8, 9);

/** 利用 with 语句设置别名 **/
WITH temp_table (col_a, col_b) AS (
	VALUES ROW(1, 2), ROW(3, 4)
)
SELECT col_a, col_b FROM temp_table;
```

## INNER JOIN 时会跳过`null`数据

```sql
WITH temp_a(a, b) AS ( VALUES ROW(null, 1), ROW(1, 2) )
	,temp_b(a, b) AS ( VALUES ROW(null, 1), ROW(1, 2) )
SELECT a.a a_a, a.b a_b, b.a b_a, b.b b_b 
FROM temp_a a JOIN temp_b b ON a.a = b.a
```


## 参考资料

- [MySQL 8.0 Reference Manual - SHOW Statements](https://dev.mysql.com/doc/refman/8.0/en/show.html)
- [MySQL 8.0 Reference Manual - XML Functions](https://dev.mysql.com/doc/refman/8.0/en/xml-functions.html)
- [MySQL 8.0 Reference Manual - JSON Functions](https://dev.mysql.com/doc/refman/8.0/en/json-functions.html)
