package com.example.demo;

import com.example.demo.model.dao.Rooms;
import com.example.demo.repository.RoomsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class RoomsUpdateTest extends BaseCrudTest {

    @Autowired
    private RoomsRepository roomsRepository;

    @Test
    void testUpdate() {
        // Укажи ID комнаты
        Long roomId = 1L;
        
        Rooms room = roomsRepository.findById(roomId).orElseThrow();
        
        // Меняй что хочешь
        room.setName("Updated Room Name");
        room.setPurpose("Conference");
        room.setAccessLevel("MEDIUM");
        
        roomsRepository.save(room);

        Rooms updated = roomsRepository.findById(roomId).orElse(null);
        assertNotNull(updated);
        System.out.println("Rooms UPDATE OK - New name: " + updated.getName());
    }
}
