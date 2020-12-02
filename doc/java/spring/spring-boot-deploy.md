---
title: "Spring Boot 应用发布"
---

## 应用的部署：

```sh
java -jar -Djava.ext.dirs=./ocean-crawler-core ./ocean-crawler-core/ocean-crawler-core-1.0-SNAPSHOT.jar
```

## 在Jar文件中增加Main-Class描述：

> Maven 插件配置

```xml
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-jar-plugin</artifactId>
	<configuration>
		<archive>
			<manifest>
				<addClasspath>true</addClasspath>
				<classpathPrefix>lib/</classpathPrefix>
				<mainClass>com.douyu.ocean.crawler.Application</mainClass>
			</manifest>
		</archive>
	</configuration>
</plugin>
```

## 打包目标文件和依赖：

> 打包规则通过package.xml来组织文件

```xml
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-assembly-plugin</artifactId>
	<version>2.6</version>
	<configuration>
		<appendAssemblyId>false</appendAssemblyId>
		<descriptors>
		<descriptor>package.xml</descriptor>
		</descriptors>
	</configuration>
	<executions>
		<execution>
			<id>make-assembly</id>
			<phase>package</phase>
			<goals>
				<goal>single</goal>
			</goals>
		</execution>
	</executions>
</plugin>
```