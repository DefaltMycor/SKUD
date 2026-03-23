package com.example.demo;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.model.dao.Users;
import com.example.demo.repository.UsersRepository;

public class UsersCreateTest extends BaseCrudTest {

    @Autowired
    private UsersRepository usersRepository;

    @Test
    void testCreate() {
        String uid = UUID.randomUUID().toString().substring(0, 8);

        Users user = new Users();
        user.setFullName("Гари поттер");
        user.setEmail("create_" + uid + "@test.com");
        user.setPhone("1234567890");
        user.setPosition("Engineer");
        user.setStatus("ACTIVE");
        user.setRole("USER");
        user.setPasswordHash("hashed_password");

        user = usersRepository.save(user);
        assertNotNull(user.getId());
        System.out.println("Users CREATE OK, id=" + user.getId());
    }
}
