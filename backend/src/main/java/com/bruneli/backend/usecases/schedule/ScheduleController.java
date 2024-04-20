package com.bruneli.backend.usecases.schedule;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PostMapping()
    public ResponseEntity<ScheduleEntity> createSchedule(@RequestBody @Valid CreateScheduleDTO createScheduleDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(scheduleService.create(createScheduleDTO));
    }

    @GetMapping()
    public ResponseEntity<List<GetScheduleDTO>> getSchedules() {
        return ResponseEntity.ok(scheduleService.getSchedules());
    }

}
