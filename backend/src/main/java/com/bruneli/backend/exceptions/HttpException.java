package com.bruneli.backend.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public class HttpException extends RuntimeException {

    @Getter
    private final HttpStatus httpStatus;
    private final String message;

    public HttpException(HttpStatus statusCode, String message) {
        this.message = message;
        this.httpStatus = statusCode;
    }

    @Override
    public String getMessage() {
        return message;
    }

}