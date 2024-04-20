package com.bruneli.backend.usecases.auth;

import jakarta.validation.constraints.NotEmpty;

public record LoginDTO(@NotEmpty(message = "E-mail cannot be null") String email,
                       @NotEmpty(message = "Password cannot be null") String password) {
}
