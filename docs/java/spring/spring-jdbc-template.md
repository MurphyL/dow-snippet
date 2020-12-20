---
title: "Spring JDBC Template"
list: false
---

## NamedParameterJdbcTemplate

```
private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

public void setDataSource(DataSource dataSource) {
    this.namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
}

public int countOfActorsByFirstName(String firstName) {
    String sql = "select count(0) from T_ACTOR where first_name = :first_name";
    Map namedParameters = Collections.singletonMap("first_name", firstName);
    return this.namedParameterJdbcTemplate.queryForInt(sql, namedParameters);
}
```

## 参考资料

 - [Chapter 11. Data access using JDBC](https://docs.spring.io/spring-framework/docs/2.0.x/reference/jdbc.html)
 - [NamedParameterJdbcTemplate](https://iowiki.com/springjdbc/springjdbc_namedparameterjdbctemplate.html)