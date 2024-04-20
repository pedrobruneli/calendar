package com.bruneli.backend.usecases.schedule;

import com.bruneli.backend.validations.date.DatePattern;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateScheduleDTO(
        @NotBlank(message = "name cannot be blank") @NotNull(message = "Name cannot be null") String name,
        @NotBlank(message = "email cannot be blank") @NotNull(message = "email cannot be null") String email,
        @NotBlank(message = "phone cannot be blank") @NotNull(message = "phone cannot be null") String phone,
        String observations,
        @NotNull(message = "startDate cannot be null") @DatePattern(message = "startDate must be an ISO 8601") String startDate,
        @NotNull(message = "endDate cannot be null") @DatePattern(message = "endDate must be an ISO 8601") String endDate) {
}


