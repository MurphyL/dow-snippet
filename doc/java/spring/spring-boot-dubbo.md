---
title: "Spring Boot 接入Dubbo"
list: false
---


```java
@Configuration
// 指定Service扫描目录
@DubboComponentScan("xxx.service")
public class DubboConfig {

	@Bean
	public ApplicationConfig dubboProviderConfig(){
		ApplicationConfig config = new ApplicationConfig();
		config.setName(applicationName);
		returnconfig;
	}

	@Bean
	public RegistryConfig registryConfig(){
		RegistryConfig config = new RegistryConfig();
		config.setAddress(registryAddress);
		// 可以使用zk的第三方客户端，也可以使用官方客户端
		config.setClient(registryClient);
		// registry.setProtocol("zookeeper");
		// registry.setUsername("aaa");
		// registry.setPassword("bbb");
		returnconfig;
	}

	@Bean
	public ProtocolConfig protocolConfig(){
		ProtocolConfig config = new ProtocolConfig();
		config.setName(protocolName);
		config.setPort(protocolPort);
		return config;
	}

}

```