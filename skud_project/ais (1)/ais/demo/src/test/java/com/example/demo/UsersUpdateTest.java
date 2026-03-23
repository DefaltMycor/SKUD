package com.example.demo;

import com.example.demo.model.dao.Users;
import com.example.demo.repository.UsersRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class UsersUpdateTest extends BaseCrudTest {

    @Autowired
    private UsersRepository usersRepository;

    @Test
    void testUpdate() {
        // Укажи ID который хочешь обновить
        Long userId = 12L;
        
        Users user = usersRepository.findById(userId).orElseThrow();
        
        // Меняй что хочешь
        user.setFullName("U1234");
        user.setPosition("12344r");
        user.setStatus("1234");
        user.setEmail("1234");
        user.setPhone("1234");
        
        usersRepository.save(user);

        Users updated = usersRepository.findById(userId).orElse(null);
        assertNotNull(updated);
        System.out.println("Users UPDATE OK - New name: " + updated.getFullName());
    }
}
