---
title: "MySQL 执行计划详解"
icon: 'mysql'
list: true
---

`explain`在性能分析中的使用：

- select_type：有几种值：simple（表示简单的select，没有union和子查询），primary（有子查询，最外面的select查询就是primary），union（union中的第二个或随后的select查询，不依赖外部查询结果），dependent union（union中的第二个或随后的select查询，依赖外部查询结果）；
- type，有几种值：system（表仅有一行（=系统表），这是const连接类型的一个特例），const（常量查询）, ref(非唯一索引访问，只有普通索引)，eq_ref（使用唯一索引或组件查询），all（全表查询），index（根据索引查询全表），range（范围查询）；
- possible_keys: 表中可能帮助查询的索引；
- key，选择使用的索引；
- key_len，使用的索引长度；
- rows，扫描的行数，越大越不好；
- extra，有几种值：Only index（信息从索引中检索出，比扫描表快），where used（使用where限制），Using filesort （可能在内存或磁盘排序），Using temporary（对查询结果排序时使用临时表）；