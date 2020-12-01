---
title: "Spring 加载资源文件"
---

## 通过`Path`解析资源

```java
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
	EasyMybatisSessionFactoryBean sessionFactory = new EasyMybatisSessionFactoryBean();
	PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
	sessionFactory.setMapperLocations(resolver.getResources("classpath*:/com.murphyl*/*.xml"));
	sessionFactory.setConfigLocation(resolver.getResource("classpath:config/mybatis-config.xml"));
    sessionFactory.setMapperLocations(resolver.getResources("classpath:mapper/*/*.xml"));
    sessionFactory.setDataSource(dataSource);
    Properties sqlSessionFactoryProperties = new Properties();
    sqlSessionFactoryProperties.put("dialect", "oracle");
    sessionFactory.setConfigurationProperties(sqlSessionFactoryProperties);
    return sessionFactory.getObject();
}
```

## 读取`Class Path`下的资源

```java
ClassPathResource resource = new ClassPathResource("config.yml");
```