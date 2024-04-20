package com.bruneli.backend.usecases.user;

import com.bruneli.backend.exceptions.HttpException;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<GetUserDTO> getUsers() {
        return userRepository.findAll().stream().map(user -> {
            GetUserDTO userDTO = new GetUserDTO();
            BeanUtils.copyProperties(user, userDTO);
            return userDTO;
        }).toList();
    }

    public GetUserDTO getUser(String username) {
        UserEntity user = userRepository.findByUsername(username);
        if (user == null) {
            throw new HttpException(HttpStatus.NOT_FOUND, "User not found");
        }
        GetUserDTO userDTO = new GetUserDTO();
        BeanUtils.copyProperties(user, userDTO);
        return userDTO;
    }

}
