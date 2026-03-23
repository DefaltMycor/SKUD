package com.example.demo;

import com.example.demo.repository.UsersRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class UsersDeleteTest extends BaseCrudTest {

    @Autowired
    private UsersRepository usersRepository;

    @Test
    void testDelete() {
        // Укажи ID который хочешь удалить
        Long userId = 1L;
        
        usersRepository.deleteById(userId);
        assertFalse(usersRepository.findById(userId).isPresent());
        System.out.println("Users DELETE OK - ID: " + userId + " removed");
    }
}
