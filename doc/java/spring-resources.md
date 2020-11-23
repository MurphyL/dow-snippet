---
title: "Spring 加载资源文件"
---

## 通过Path解析资源

```java
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

// 通过Path解析资源
PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
factoryBean.setMapperLocations(resolver.getResources("classpath*:/com.murphyl*/*.xml"));
```

## 读取Class Path下的资源

```java
ClassPathResource resource = new ClassPathResource("config.yml");
```