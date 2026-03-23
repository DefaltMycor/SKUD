package com.example.demo.controller;

import com.example.demo.model.dao.Users;
import com.example.demo.repository.UsersRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UsersController {

    private final UsersRepository usersRepository;

    public UsersController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @GetMapping
    public List<Users> getAll() {
        return usersRepository.findAll();
    }

    @GetMapping("/{id}")
    public Users getById(@PathVariable Long id) {
        return usersRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Пользователь с ID " + id + " не найден"));
    }

    @PostMapping
    public Users create(@RequestBody Users user) {
        return usersRepository.save(user);
    }

    @PutMapping("/{id}")
    public Users update(@PathVariable Long id, @RequestBody Users updated) {
        return usersRepository.findById(id).map(user -> {
            user.setFullName(updated.getFullName());
            user.setEmail(updated.getEmail());
            user.setPhone(updated.getPhone());
            user.setPosition(updated.getPosition());
            user.setStatus(updated.getStatus());
            user.setRole(updated.getRole());
            if (updated.getPasswordHash() != null) {
                user.setPasswordHash(updated.getPasswordHash());
            }
            return usersRepository.save(user);
        }).orElseThrow(() -> new NoSuchElementException("Пользователь с ID " + id + " не найден"));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!usersRepository.existsById(id)) {
            throw new NoSuchElementException("Пользователь с ID " + id + " не найден");
        }
        usersRepository.deleteById(id);
    }
}
