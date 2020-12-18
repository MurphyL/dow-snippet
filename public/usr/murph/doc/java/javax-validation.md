All of the annotations used in the example are standard JSR annotations:

- @NotNull validates that the annotated property value is not null.
- @AssertTrue validates that the annotated property value is true.
- @Size validates that the annotated property value has a size between the attributes min and max; can be applied to String, Collection, Map, and array properties.
- @Min validates that the annotated property has a value no smaller than the value attribute.
- @Max validates that the annotated property has a value no larger than the value attribute.
- @Email validates that the annotated property is a valid email address.

Some annotations accept additional attributes, but the message attribute is common to all of them. This is the message that will usually be rendered when the value of the respective property fails validation.

And some additional annotations that can be found in the JSR:

- @NotEmpty validates that the property is not null or empty; can be applied to String, Collection, Map or Array values.
- @NotBlank can be applied only to text values and validates that the property is not null or whitespace.
- @Positive and @PositiveOrZero apply to numeric values and validate that they are strictly positive, or positive including 0.
- @Negative and @NegativeOrZero apply to numeric values and validate that they are strictly negative, or negative including 0.
- @Past and @PastOrPresent validate that a date value is in the past or the past including the present; can be applied to date types including those added in Java 8.
- @Future and @FutureOrPresent validate that a date value is in the future, or in the future including the present.

Now let's go the manual route and set things up programmatically:

```java
ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
Validator validator = factory.getValidator();
```

Now that we have a Validator, we can validate our bean by passing it to the validate method.

Any violations of the constraints defined in the User object will be returned as a Set:

```java
Set<ConstraintViolation<User>> violations = validator.validate(user);
```

By iterating over the violations, we can get all the violation messages using the getMessage method:

```java
for (ConstraintViolation<User> violation : violations) {
    log.error(violation.getMessage()); 
}
```

> validatedValue