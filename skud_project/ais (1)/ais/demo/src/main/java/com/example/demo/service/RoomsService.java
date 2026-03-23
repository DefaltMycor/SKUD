package com.example.demo.service;

import com.example.demo.model.dao.Rooms;
import com.example.demo.repository.RoomsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RoomsService {

    private final RoomsRepository repository;

    public RoomsService(RoomsRepository repository) {
        this.repository = repository;
    }

    public List<Rooms> getAll() {
        return repository.findAll();
    }

    public Optional<Rooms> getById(Long id) {
        return repository.findById(id);
    }

    
    public Rooms create(Rooms room) {
        return repository.save(room);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
