package com.bruneli.backend.usecases.schedule;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity, String> {
    List<ScheduleEntity> findByStartDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}
