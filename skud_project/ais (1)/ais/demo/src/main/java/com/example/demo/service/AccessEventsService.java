package com.example.demo.service;

import com.example.demo.model.dao.AccessEvents;
import com.example.demo.repository.AccessEventsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AccessEventsService {

    private final AccessEventsRepository repository;

    public AccessEventsService(AccessEventsRepository repository) {
        this.repository = repository;
    }

    public List<AccessEvents> getAll() {
        return repository.findAll();
    }

    public AccessEvents getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Событие доступа с ID " + id + " не найдено"));
    }

    public AccessEvents create(AccessEvents event) {
        return repository.save(event);
    }

    public AccessEvents update(Long id, AccessEvents updated) {
        return repository.findById(id).map(e -> {
            e.setUser(updated.getUser());
            e.setRoom(updated.getRoom());
            e.setCard(updated.getCard());
            e.setController(updated.getController());
            e.setEventTime(updated.getEventTime());
            e.setResult(updated.getResult());
            e.setReason(updated.getReason());
            return repository.save(e);
        }).orElseThrow(() -> new NoSuchElementException("Событие доступа с ID " + id + " не найдено"));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new NoSuchElementException("Событие доступа с ID " + id + " не найдено");
        }
        repository.deleteById(id);
    }
}
