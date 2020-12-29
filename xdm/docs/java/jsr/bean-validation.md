---
title: "Java - Validation API"
list: false
---

## 标准注解

- `@NotNull`/`@Null`
- `@AssertTrue`/`@AssertFalse`
- `@Size`
- `@Min`/`@Max`/`@DecimalMax`/`@DecimalMin`
- `@NotEmpty`
- `@NotBlank`

### 校验数字的值域

|  注解   | 注释 |
|  ----  | ----  |
| `@Digits`  | 实数 |
| `@Positive`  | 大于0的数字 |
| `@PositiveOrZero`  | 大于等于0的数字 |
| `@Negative` | 小于0的数字 | 
| `@NegativeOrZero`  | 小于等于0的数字 |

### 时间类型及值域

- `@Past`/`@PastOrPresent`
- `@Future`/`@FutureOrPresent`

### 字符串模式匹配

|  注解   | 注释 |
|  ----  | ----  |
| `@Pattern`  | 正则表达式 |
| `@URL`  | `URL`地址 |
| `@Email` | `EMail`地址 | 

## 通过编码的方式创建`Validator`

```java
Validator factory = Validation.buildDefaultValidatorFactory().getValidator();
Set<ConstraintViolation<User>> violations = validator.validate(user);
for (ConstraintViolation<User> violation : violations) {
    log.error(violation.getMessage()); // validatedValue
}
```

## 参考资料

- [JSR 303: Bean Validation](https://www.jcp.org/en/jsr/detail?id=303)