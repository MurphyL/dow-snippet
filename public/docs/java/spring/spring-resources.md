## 通过`Path`解析资源


```java
new ClassPathResource("config.yml");
// ClassPathXmlApplicationContext 
(ClassPathXmlApplicationContext) ctx.getResource("classpath:config.yml");
// 读取网络资源
(ClassPathXmlApplicationContext) ctx.getResource("http://murphyl.com/demo.txt");
// new PathMatchingResourcePatternResolver()
(PathMatchingResourcePatternResolver) resolver.getResources("classpath*:/com.murphyl*/*.xml")
```

|  Prefix   | Example | Explanation  |
|  ----  | ----  | ----  |
| classpath:  | classpath:config.yml | Loaded from the classpath. |
| file:  | file:config.yml | Loaded as a URL, from the filesystem. |
| http: | http://murphyl.com/demo.txt | Loaded as a URL. |
| (none)  | /data/config.xml |  |