package com.example.demo.service;

import com.example.demo.model.dao.Controllers;
import com.example.demo.repository.ControllersRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ControllersService {

    private final ControllersRepository repository;

    public ControllersService(ControllersRepository repository) {
        this.repository = repository;
    }

    public List<Controllers> getAll() {
        return repository.findAll();
    }

    public Controllers getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Контроллер с ID " + id + " не найден"));
    }

    public List<Controllers> getByRoomId(Long roomId) {
        return repository.findByRoomId(roomId);
    }

    public Controllers save(Controllers controller) {
        return repository.save(controller);
    }

    public Controllers update(Long id, Controllers updated) {
        return repository.findById(id).map(c -> {
            c.setName(updated.getName());
            c.setDeviceType(updated.getDeviceType());
            c.setIpAddress(updated.getIpAddress());
            c.setStatus(updated.getStatus());
            c.setRoom(updated.getRoom());
            return repository.save(c);
        }).orElseThrow(() -> new NoSuchElementException("Контроллер с ID " + id + " не найден"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new NoSuchElementException("Контроллер с ID " + id + " не найден");
        }
        repository.deleteById(id);
    }
}
