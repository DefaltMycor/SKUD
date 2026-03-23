package com.example.demo.controller;

import com.example.demo.model.dao.Users;
import com.example.demo.repository.UsersRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UsersRepository usersRepository;

    public AuthController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @PostMapping("/login")
    public Users login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email не может быть пустым");
        }

        return usersRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("Пользователь с email " + email + " не найден"));
    }
}
