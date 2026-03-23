package com.example.demo.controller;

import com.example.demo.model.dao.Rooms;
import com.example.demo.service.RoomsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomsController {

    private final RoomsService service;

    public RoomsController(RoomsService service) {
        this.service = service;
    }

    @GetMapping
    public List<Rooms> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Rooms create(@RequestBody Rooms room) {
        if (room.getAccessLevel() == null) {
            room.setAccessLevel("DEFAULT");
        }
        return service.create(room);
    }
}
