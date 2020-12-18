在`Spring Boot`中，使用事务回滚：在回滚方法上加上@Transactional注解。

1. 手动抛出一个异常： `throw new RuntimeException()`;
2. 通过方法回滚：`TransactionAspectSupport.currentTransactionStatus().setRollbackOnly()`;

## 手动控制事务

```java
@Resource(name="transactionManager")
private DataSourceTransactionManager transactionManager;

DefaultTransactionDefinition transDefinition = new DefaultTransactionDefinition();
//开启新事物
transDefinition.setPropagationBehavior(DefaultTransactionDefinition.PROPAGATION_REQUIRES_NEW);
TransactionStatus transStatus = transactionManager.getTransaction(transDefinition);
try {
    //TODO
    transactionManager.commit(transStatus);
} catch (Exception e) {
    transactionManager.rollback(transStatus);
}
```