---
title: "Hive 使用手册"
---

## DML

### 数据导入

```SQL
LOAD DATA INPATH '/hdfs/user_info_overwrite.txt' OVERWRITE  INTO TABLE test_user;
```

### Beeline

```sh
$HIVE_HOME/bin/beeline -u jdbc:hive2://127.0.0.1:10000 -n hive
```