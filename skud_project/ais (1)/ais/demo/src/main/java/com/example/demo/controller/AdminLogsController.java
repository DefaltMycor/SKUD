package com.example.demo.controller;

import com.example.demo.model.dao.AdminLogs;
import com.example.demo.repository.AdminLogsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/admin-logs")
public class AdminLogsController {

    private final AdminLogsRepository repository;

    public AdminLogsController(AdminLogsRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<AdminLogs> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public AdminLogs getById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Лог администратора с ID " + id + " не найден"));
    }

    @PostMapping
    public AdminLogs create(@RequestBody AdminLogs log) {
        return repository.save(log);
    }

    @PutMapping("/{id}")
    public AdminLogs update(@PathVariable Long id, @RequestBody AdminLogs log) {
        return repository.findById(id).map(l -> {
            l.setAction(log.getAction());
            l.setAdmin(log.getAdmin());
            l.setTimestamp(log.getTimestamp());
            return repository.save(l);
        }).orElseThrow(() -> new NoSuchElementException("Лог администратора с ID " + id + " не найден"));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new NoSuchElementException("Лог администратора с ID " + id + " не найден");
        }
        repository.deleteById(id);
    }
}
