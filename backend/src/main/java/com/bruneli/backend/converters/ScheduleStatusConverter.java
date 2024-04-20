package com.bruneli.backend.converters;

import java.util.stream.Stream;

import com.bruneli.backend.usecases.schedule.ScheduleStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ScheduleStatusConverter implements AttributeConverter<ScheduleStatus, String> {

    @Override
    public String convertToDatabaseColumn(ScheduleStatus category) {
        if (category == null) {
            return null;
        }
        return category.getValue();
    }

    @Override
    public ScheduleStatus convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
        }
        return Stream.of(ScheduleStatus.values())
                .filter(c -> c.getValue().equals(value))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }

}
