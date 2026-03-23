package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.repository.AccessEventsRepository;

public class AccessEventsDeleteTest extends BaseCrudTest {

    @Autowired
    private AccessEventsRepository accessEventsRepository;

    @Test
    void testDelete() {
        // Укажи ID события
        Long eventId = 2L;
        
        accessEventsRepository.deleteById(eventId);
        assertFalse(accessEventsRepository.findById(eventId).isPresent());
        System.out.println("AccessEvents DELETE OK - ID: " + eventId);
    }
}
