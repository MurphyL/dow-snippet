---
title: "Spring Bean 生命周期"
---

## 注解方式

可以使用注解`@PostConstruct`, `@PreDestroy`来在`Bean`的创建和销毁阶段进行调用：

```java
@Component
public class AnnotationBean {

    private final static Logger LOGGER = LoggerFactory.getLogger(AnnotationBean.class);

    @PostConstruct
    public void start(){
        LOGGER.info("AnnotationBean start");
    }

    @PreDestroy
    public void destroy(){
        LOGGER.info("AnnotationBean destroy");
    }

}
```

## `InitializingBean`，`DisposableBean`接口

还可以实现`InitializingBean`，`DisposableBean`这两个接口，也是在初始化以及销毁阶段调用：

```java
@Service
public class SpringLifeCycleService implements InitializingBean,DisposableBean{

    private final static Logger LOGGER = LoggerFactory.getLogger(SpringLifeCycleService.class);
    
    @Override
    public void afterPropertiesSet() throws Exception {
        LOGGER.info("SpringLifeCycleService start");
    }

    @Override
    public void destroy() throws Exception {
        LOGGER.info("SpringLifeCycleService destroy");
    }

}
```

## 自定义初始化和销毁方法

也可以自定义方法用于在初始化、销毁阶段调用：

```java
@Configuration
public class LifeCycleConfig {

    @Bean(initMethod = "start", destroyMethod = "destroy")
    public SpringLifeCycle create(){
        SpringLifeCycle springLifeCycle = new SpringLifeCycle() ;

        return springLifeCycle ;
    }

}

public class SpringLifeCycle{

    private final static Logger LOGGER = LoggerFactory.getLogger(SpringLifeCycle.class);

    public void start(){
        LOGGER.info("SpringLifeCycle start");
    }


    public void destroy(){
        LOGGER.info("SpringLifeCycle destroy");
    }

}
```

以上是在`Spring Boot`中可以这样配置，如果是原始的基于`XML`也是可以使用：

```xml
<bean class="com.crossoverjie.spring.SpringLifeCycle" init-method="start" destroy-method="destroy" />
```

## `BeanPostProcessor`增强处理器

实现`BeanPostProcessor`接口，`Spring`中所有`Bean`在做初始化时都会调用该接口中的两个方法，可以用于对一些特殊的`Bean`进行处理：

```java
@Component
public class SpringLifeCycleProcessor implements BeanPostProcessor {
    
    private final static Logger LOGGER = LoggerFactory.getLogger(SpringLifeCycleProcessor.class);

    /**
     * 预初始化 初始化之前调用
     * @param bean
     * @param beanName
     * @return
     * @throws BeansException
     */
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        if ("annotationBean".equals(beanName)){
            LOGGER.info("SpringLifeCycleProcessor start beanName={}",beanName);
        }
        return bean;
    }

    /**
     * 后初始化  bean 初始化完成调用
     * @param bean
     * @param beanName
     * @return
     * @throws BeansException
     */
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        if ("annotationBean".equals(beanName)){
            LOGGER.info("SpringLifeCycleProcessor end beanName={}",beanName);
        }
        return bean;
    }
}
```