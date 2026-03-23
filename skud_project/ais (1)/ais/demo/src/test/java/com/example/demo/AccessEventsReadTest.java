package com.example.demo;

import com.example.demo.model.dao.AccessEvents;
import com.example.demo.repository.AccessEventsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class AccessEventsReadTest extends BaseCrudTest {

    @Autowired
    private AccessEventsRepository accessEventsRepository;

    @Test
    void testRead() {
        // Укажи ID события
        Long eventId = 1L;
        
        AccessEvents event = accessEventsRepository.findById(eventId).orElse(null);
        assertNotNull(event);
        System.out.println("AccessEvents READ OK - ID: " + eventId + ", Result: " + event.getResult());
    }
}
