package com.example.demo;

import com.example.demo.repository.RoomsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class RoomsDeleteTest extends BaseCrudTest {

    @Autowired
    private RoomsRepository roomsRepository;

    @Test
    void testDelete() {
        // Укажи ID комнаты
        Long roomId = 1L;
        
        roomsRepository.deleteById(roomId);
        assertFalse(roomsRepository.findById(roomId).isPresent());
        System.out.println("Rooms DELETE OK - ID: " + roomId);
    }
}
