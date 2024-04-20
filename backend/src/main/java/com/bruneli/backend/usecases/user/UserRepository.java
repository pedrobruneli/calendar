package com.bruneli.backend.usecases.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String> {

    UserEntity findByEmail(String email);
    UserEntity findByUsername(String username);

}
