package com.example.demo.controller;

import com.example.demo.model.dao.AccessEvents;
import com.example.demo.service.AccessEventsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/access-events")
@Tag(name = "Access Events", description = "API для управления событиями доступа")
public class AccessEventsController {

    @Autowired
    private AccessEventsService service;

    @GetMapping
    @Operation(summary = "Получить все события доступа")
    public List<AccessEvents> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Получить событие доступа по ID")
    public AccessEvents getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    @Operation(summary = "Создать событие доступа")
    public AccessEvents create(@RequestBody AccessEvents event) {
        return service.create(event);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Обновить событие доступа")
    public AccessEvents update(@PathVariable Long id, @RequestBody AccessEvents updatedEvent) {
        return service.update(id, updatedEvent);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Удалить событие доступа по ID")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
