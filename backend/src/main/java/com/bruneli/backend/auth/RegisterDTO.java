package com.bruneli.backend.auth;

import jakarta.validation.constraints.NotEmpty;

public record RegisterDTO(@NotEmpty(message = "Name cannot be null") String name,
                          @NotEmpty(message = "E-mail cannot be null") String email,
                          @NotEmpty(message = "Password cannot be null") String password) {
}
