package com.example.demo.service;

import com.example.demo.model.dao.Users;
import com.example.demo.repository.UsersRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsersService {

    private final UsersRepository repository;

    public UsersService(UsersRepository repository) {
        this.repository = repository;
    }

    public List<Users> getAll() {
        return repository.findAll();
    }

    public Optional<Users> getById(Long id) {
        return repository.findById(id);
    }

    public Users create(Users user) {
        return repository.save(user);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
