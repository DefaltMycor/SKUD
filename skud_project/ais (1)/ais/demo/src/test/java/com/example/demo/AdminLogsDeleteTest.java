package com.example.demo;

import com.example.demo.repository.AdminLogsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class AdminLogsDeleteTest extends BaseCrudTest {

    @Autowired
    private AdminLogsRepository adminLogsRepository;

    @Test
    void testDelete() {
        // Укажи ID лога
        Long logId = 1L;
        
        adminLogsRepository.deleteById(logId);
        assertFalse(adminLogsRepository.findById(logId).isPresent());
        System.out.println("AdminLogs DELETE OK - ID: " + logId);
    }
}
