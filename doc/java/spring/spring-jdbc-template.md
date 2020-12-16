---
title: "Spring JDBC Template"
---

`SpEL`（Spring Expression Language），即`Spring`表达式语言，是比JSP的EL更强大的一种表达式语言。

```java
import org.springframework.expression.Expression;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;

public class SpELTest {
 
    public static void main(String[] args) {
        //创建ExpressionParser解析表达式
        ExpressionParser parser = new SpelExpressionParser();
        //表达式放置
        Expression exp = parser.parseExpression("表达式");
        //执行表达式，默认容器是spring本身的容器：ApplicationContext
        Object value = exp.getValue();
    }
}
```