---
title: "MyBatis Mapper 文件"
list: true
---

## `Mapper`常用元素

对应一个接口

### `mapper` - 映射SQL语句和接口文件中的方法

```xml
<mapper namespace="com.dy.dao.UserDao" />
```

mapper元素只有一个属性namespace，它有两个作用：

一是用于区分不同的mapper（在不同的mapper文件里，子元素的id可以相同，mybatis通过namespace和子元素的id联合区分）；
二是与接口关联（应用程序通过接口访问mybatis时，mybatis通过接口的完整名称查找对应的mapper配置，因此namespace的命名务必小心一定要某接口同名）。

### `cache` - 配置本定命名空间的缓存。

```xml
<cache type="PERPETUAL" eviction="LRU" flushInterval="60000" size="512" readOnly="true" />
```

1. type：cache实现类，默认为PERPETUAL，可以使用自定义的cache实现类（别名或完整类名皆可）;
2. eviction：回收算法，默认为LRU，可选的算法有：
    - LRU：最近最少使用的，即移除最长时间不被使用的对象；
    - FIFO：先进先出，即按对象进入缓存的顺序来移除它们；
    - SOFT：软引用，即移除基于垃圾回收器状态和软引用规则的对象；
    - WEAK：弱引用，即更积极地移除基于垃圾收集器状态和弱引用规则的对象；
3. flushInterval：刷新间隔，默认为1个小时，单位毫秒；
4. size：缓存大小，默认大小1024，单位为引用数；
5. readOnly：只读。

### `cache-ref` - 从其他命名空间引用缓存配置。

```xml
<cache-ref namespace="com.someone.application.data.SomeMapper" />
```

1. 如果你不想定义自己的cache，可以使用cache-ref引用别的cache。因为每个cache都以namespace为id，所以cache-ref只需要配置一个namespace属性就可以了；
2. 需要注意的是，如果cache-ref和cache都配置了，以cache为准。


### Select、Inert、Update、Delete

```xml
<insert id="insertUser" 
    parameterType="com.demo.User" 
    flushCache="true" 
    statementType="PREPARED" 
    keyProperty="" 
    keyColumn="" 
    useGeneratedKeys="false" 
    timeout="20">
    <![CDATA[ 查询语句 ]]>
</insert>
```

1. id*：id是命名空间中的唯一标识符，可被用来代表这条语句。 一个命名空间（namespace） 对应一个dao接口, 这个id也应该对应dao里面的某个方法（相当于方法的实现），因此id 应该与方法名一致；
2. parameterType（可选配置, 默认为mybatis自动选择处理）：将要传入语句的参数的完全限定类名或别名， 如果不配置，mybatis会通过ParameterHandler 根据参数类型默认选择合适的typeHandler进行处理 parameterType 主要指定参数类型，可以是int, short, long, string等类型，也可以是复杂类型（如对象） ；
3. flushCache（可选配置，默认配置为true）：将其设置为 true，任何时候只要语句被调用，都会导致本地缓存和二级缓存都会被清空，默认值：true（对应插入、更新和删除语句） ；
4. statementType（可选配置，默认配置为PREPARED）：STATEMENT，PREPARED 或 CALLABLE 的一个。这会让 MyBatis 分别使用 Statement，PreparedStatement 或 CallableStatement，默认值：PREPARED；
5. keyProperty（可选配置，默认为unset）：（仅对 insert 和 update 有用）唯一标记一个属性，MyBatis 会通过 getGeneratedKeys 的返回值或者通过 insert 语句的 selectKey 子元素设置它的键值，默认：unset。如果希望得到多个生成的列，也可以是逗号分隔的属性名称列表；
6. keyColumn（可选配置）：（仅对 insert 和 update 有用）通过生成的键值设置表中的列名，这个设置仅在某些数据库（像 PostgreSQL）是必须的，当主键列不是表中的第一列的时候需要设置。如果希望得到多个生成的列，也可以是逗号分隔的属性名称列表；
7. useGeneratedKeys（可选配置， 默认为false）：（仅对 insert 和 update 有用）这会令 MyBatis 使用 JDBC 的 getGeneratedKeys 方法来取出由数据库内部生成的主键（比如：像 MySQL 和 SQL Server 这样的关系数据库管理系统的自动递增字段），默认值：false；
8. timeout （可选配置，默认为unset，依赖驱动）：这个设置是在抛出异常之前，驱动程序等待数据库返回请求结果的秒数。默认值为 unset（依赖驱动）。 

## 参考资料

- [MyBatis详解 - Mapper映射文件配置](https://www.pdai.tech/md/framework/orm-mybatis/mybatis-y-config-mapper.html)