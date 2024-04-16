package com.bruneli.backend.auth;

import com.bruneli.backend.user.UserEntity;
import com.bruneli.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public void registerUser(RegisterDTO user) {
        String hashedPassword = BCrypt.hashpw(user.password(), BCrypt.gensalt());
        UserEntity newUser = new UserEntity(null, user.name(), user.email(), hashedPassword);
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
