package com.bruneli.backend.usecases.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetUserDTO {

    private String name;
    private String email;
    private String username;

}
