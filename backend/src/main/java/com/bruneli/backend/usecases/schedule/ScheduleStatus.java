package com.bruneli.backend.usecases.schedule;

import lombok.Getter;

@Getter
public enum ScheduleStatus {
    UPCOMING("upcoming"),
    DELAYED("delayed"),
    CANCELED("canceled"),
    DONE("done");

    private final String value;

    private ScheduleStatus(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }
}
