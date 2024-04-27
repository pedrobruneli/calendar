package com.bruneli.backend.usecases.schedule;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetScheduleDTO{
    private String id;
    private String name;
    private String email;
    private String phone;
    private String observations;
    private String startDate;
    private String endDate;
    private String createdAt;
    private String status;
}
