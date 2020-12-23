---
title: "Java - Validation API"
list: false
---

## 标准注解

- @NotNull：validates that the annotated property value is not null.
- @AssertTrue：validates that the annotated property value is true.
- @Size：validates that the annotated property value has a size between the attributes min and max; can be applied to String, Collection, Map, and array properties.
- @Min：validates that the annotated property has a value no smaller than the value attribute.
- @Max：validates that the annotated property has a value no larger than the value attribute.
- @Email：validates that the annotated property is a valid email address.

Some annotations accept additional attributes, but the message attribute is common to all of them. This is the message that will usually be rendered when the value of the respective property fails validation.

## 附加部分的注解

- @NotEmpty validates that the property is not null or empty; can be applied to String, Collection, Map or Array values.
- @NotBlank can be applied only to text values and validates that the property is not null or whitespace.
- @Positive and @PositiveOrZero apply to numeric values and validate that they are strictly positive, or positive including 0.
- @Negative and @NegativeOrZero apply to numeric values and validate that they are strictly negative, or negative including 0.
- @Past and @PastOrPresent validate that a date value is in the past or the past including the present; can be applied to date types including those added in Java 8.
- @Future and @FutureOrPresent validate that a date value is in the future, or in the future including the present.

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