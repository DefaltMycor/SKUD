package com.example.demo;

import com.example.demo.model.dao.AccessEvents;
import com.example.demo.repository.AccessEventsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class AccessEventsUpdateTest extends BaseCrudTest {

    @Autowired
    private AccessEventsRepository accessEventsRepository;

    @Test
    void testUpdate() {
        // Укажи ID события
        Long eventId = 1L;
        
        AccessEvents event = accessEventsRepository.findById(eventId).orElseThrow();
        
        // Меняй что хочешь
        event.setResult("DENIED");
        event.setReason("Access revoked");
        event.setEventTime(LocalDateTime.now());
        
        accessEventsRepository.save(event);

        AccessEvents updated = accessEventsRepository.findById(eventId).orElse(null);
        assertNotNull(updated);
        System.out.println("AccessEvents UPDATE OK - New result: " + updated.getResult());
    }
}
