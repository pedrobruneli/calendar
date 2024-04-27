package com.bruneli.backend.usecases.schedule;

import com.bruneli.backend.exceptions.HttpException;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public ScheduleEntity create(CreateScheduleDTO createScheduleDTO) {
        validateSchedule(createScheduleDTO);
        ScheduleEntity scheduleEntity = buildScheduleEntity(createScheduleDTO);
        return scheduleRepository.save(scheduleEntity);
    }

    public void delete(String id) {
        scheduleRepository.deleteById(id);
    }

    public GetScheduleDTO complete(String id) {
        ScheduleEntity scheduleEntity = scheduleRepository.findById(id)
                .orElseThrow(() -> new HttpException(HttpStatus.NOT_FOUND, "Schedule not found"));
        scheduleEntity.setStatus(ScheduleStatus.DONE);
        scheduleRepository.save(scheduleEntity);
        return buildGetScheduleDTO(scheduleEntity);
    }

    private ScheduleEntity buildScheduleEntity(CreateScheduleDTO createScheduleDTO) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
                .withZone(ZoneId.of("UTC"));
        ScheduleEntity scheduleEntity = new ScheduleEntity();
        BeanUtils.copyProperties(createScheduleDTO, scheduleEntity);
        scheduleEntity.setStartDate(LocalDateTime.parse(createScheduleDTO.startDate(), formatter));
        scheduleEntity.setEndDate(LocalDateTime.parse(createScheduleDTO.endDate(), formatter));
        return scheduleEntity;
    }

    private void validateSchedule(CreateScheduleDTO createScheduleDTO) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
                .withZone(ZoneId.of("UTC"));
        LocalDateTime startDate = LocalDateTime.parse(createScheduleDTO.startDate(), formatter);
        LocalDateTime endDate = LocalDateTime.parse(createScheduleDTO.endDate(), formatter);
        if (startDate.isAfter(endDate)) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Start date must be before end date");
        }
        List<ScheduleEntity> schedules = scheduleRepository.findByStartDateBetween(startDate, endDate);
        if (!schedules.isEmpty()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "There is already a schedule for this period");
        }
    }

    public List<GetScheduleDTO> getSchedules() {
        List<ScheduleEntity> schedules = scheduleRepository.findAll();
        return schedules.stream().map(ScheduleService::buildGetScheduleDTO).toList();
    }

    private static GetScheduleDTO buildGetScheduleDTO(ScheduleEntity scheduleEntity) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
                .withZone(ZoneId.of("UTC"));
        GetScheduleDTO getScheduleDTO = new GetScheduleDTO();
        BeanUtils.copyProperties(scheduleEntity, getScheduleDTO);
        getScheduleDTO.setStatus(scheduleEntity.getStatus().getValue());
        getScheduleDTO.setStartDate(scheduleEntity.getStartDate().format(formatter));
        getScheduleDTO.setEndDate(scheduleEntity.getEndDate().format(formatter));
        getScheduleDTO.setCreatedAt(scheduleEntity.getCreatedAt().format(formatter));
        return getScheduleDTO;
    }

}
