---
title: "MySQL 使用笔记"
---

## MySQL JOIN 时会跳过`null`数据

```sql
SELECT 'empty join' j, a.a, a.b, b.b FROM (
	SELECT '' a, 1 b
) a
JOIN (
	SELECT '' a, 2 B
) b
ON a.a = b.a
UNION ALL
SELECT 'null join' j, a.a, a.b, b.b FROM (
	SELECT null a, 1 b
) a
JOIN (
	SELECT null a, 2 B
) b
ON a.a = b.a
```

| j | a | b | b | 
| --- | --- | ---: | ---: | 
| empty join |  | 1 | 2 | 
