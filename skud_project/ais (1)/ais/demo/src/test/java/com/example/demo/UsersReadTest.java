package com.example.demo;

import com.example.demo.model.dao.Users;
import com.example.demo.repository.UsersRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class UsersReadTest extends BaseCrudTest {

    @Autowired
    private UsersRepository usersRepository;

    @Test
    void testRead() {
        // Укажи ID который хочешь прочитать
        Long userId = 1L;
        
        Users user = usersRepository.findById(userId).orElse(null);
        assertNotNull(user);
        System.out.println("Users READ OK - ID: " + userId + ", Name: " + user.getFullName());
    }
}
