package com.example.demo;

import com.example.demo.model.dao.Rooms;
import com.example.demo.repository.RoomsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class RoomsReadTest extends BaseCrudTest {

    @Autowired
    private RoomsRepository roomsRepository;

    @Test
    void testRead() {
        // Укажи ID комнаты
        Long roomId = 1L;
        
        Rooms room = roomsRepository.findById(roomId).orElse(null);
        assertNotNull(room);
        System.out.println("Rooms READ OK - ID: " + roomId + ", Name: " + room.getName());
    }
}
