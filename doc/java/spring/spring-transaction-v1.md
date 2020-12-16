---
title: "Spring 事务管理"
list: false
---

在`Spring Boot`中，使用事务回滚：在回滚方法上加上@Transactional注解。

1. 手动抛出一个异常： `throw new RuntimeException()`;
2. 通过方法回滚：`TransactionAspectSupport.currentTransactionStatus().setRollbackOnly()`;