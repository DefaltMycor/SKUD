package com.example.demo.controller;

import com.example.demo.model.dao.Controllers;
import com.example.demo.service.ControllersService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/controllers")
public class ControllersController {

    private final ControllersService controllersService;

    public ControllersController(ControllersService controllersService) {
        this.controllersService = controllersService;
    }

    @GetMapping
    public List<Controllers> getAll() {
        return controllersService.getAll();
    }

    @GetMapping("/{id}")
    public Controllers getById(@PathVariable Long id) {
        return controllersService.getById(id);
    }

    @GetMapping("/room/{roomId}")
    public List<Controllers> getByRoom(@PathVariable Long roomId) {
        return controllersService.getByRoomId(roomId);
    }

    @PostMapping
    public Controllers create(@RequestBody Controllers controller) {
        return controllersService.save(controller);
    }

    @PutMapping("/{id}")
    public Controllers update(@PathVariable Long id, @RequestBody Controllers updated) {
        return controllersService.update(id, updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        controllersService.delete(id);
    }
}
