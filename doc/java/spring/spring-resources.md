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

## 读取资源

```java
new ClassPathResource("config.yml");
// ClassPathXmlApplicationContext 
ctx.getResource("classpath:config.yml");
// 读取网络资源
ctx.getResource("http://murphyl.com/demo.txt");
```

|  Prefix   | Example | Explanation  |
|  ----  | ----  | ----  |
| classpath:  | classpath:config.yml | Loaded from the classpath. |
| file:  | file:config.yml | Loaded as a URL, from the filesystem. |
| http: | http://murphyl.com/demo.txt | Loaded as a URL. |
| (none)  | /data/config.xml |  |