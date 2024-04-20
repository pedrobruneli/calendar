package com.bruneli.backend.usecases.auth;

import com.bruneli.backend.exceptions.HttpException;
import com.bruneli.backend.usecases.user.UserEntity;
import com.bruneli.backend.usecases.user.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(RegisterDTO user) {
        UserEntity existingUser = userRepository.findByEmail(user.email());
        if (existingUser != null) {
            throw new HttpException(HttpStatus.CONFLICT, "User with email already exists");
        }
        String hashedPassword = BCrypt.hashpw(user.password(), BCrypt.gensalt(12));
        UserEntity newUser = new UserEntity();
        BeanUtils.copyProperties(user, newUser);
        newUser.setPassword(hashedPassword);
        userRepository.save(newUser);
    }

    public String login(String email, String password) {
        UserEntity user = userRepository.findByEmail(email);
        if (user != null) {
            boolean passwordMatch = BCrypt.checkpw(password, user.getPassword());
            if (!passwordMatch) {
                return null;
            }
            return user.getId();
        }
        return null;
    }

}
