package com.bruneli.backend.validations.date;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.flywaydb.core.internal.util.DateUtils;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class DatePatternValidator implements ConstraintValidator<DatePattern, String> {

    @Override
    public void initialize(DatePattern annotation) {}

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        String DATE_REGEX = "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$";
        return value != null && value.matches(DATE_REGEX);
    }
}