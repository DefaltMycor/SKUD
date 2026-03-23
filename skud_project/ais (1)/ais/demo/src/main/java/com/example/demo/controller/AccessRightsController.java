package com.example.demo.controller;

import com.example.demo.model.dao.AccessRights;
import com.example.demo.repository.AccessRightsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/access-rights")
@CrossOrigin
public class AccessRightsController {

    private final AccessRightsRepository repository;

    public AccessRightsController(AccessRightsRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<AccessRights> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public AccessRights create(@RequestBody AccessRights ar) {
        return repository.save(ar);
    }

    @PutMapping("/{id}")
    public AccessRights update(@PathVariable Long id, @RequestBody AccessRights updated) {
        return repository.findById(id).map(a -> {
            a.setUser(updated.getUser());
            a.setRoom(updated.getRoom());
            a.setSchedule(updated.getSchedule());
            a.setValidFrom(updated.getValidFrom());
            a.setValidTo(updated.getValidTo());
            return repository.save(a);
        }).orElseThrow(() -> new NoSuchElementException("Право доступа с ID " + id + " не найдено"));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new NoSuchElementException("Право доступа с ID " + id + " не найдено");
        }
        repository.deleteById(id);
    }
}
