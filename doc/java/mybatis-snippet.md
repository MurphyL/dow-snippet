---
title: "MyBatis 代码片段"
---

`IF/ELSE`语法糖：

```xml
<if test="name!=null">
	<bind name="pattern" value="'%'+name+'%'"/>
	<choose>
		<when test="planId != null">
			and (plan.id=#{planId} 
			or plan.name like #{pattern})
		</when>
		<otherwise>
			and plan.name like #{pattern}
		</otherwise>
	</choose>
</if>
```