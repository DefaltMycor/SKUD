package com.example.demo;

import com.example.demo.model.dao.AdminLogs;
import com.example.demo.repository.AdminLogsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class AdminLogsReadTest extends BaseCrudTest {

    @Autowired
    private AdminLogsRepository adminLogsRepository;

    @Test
    void testRead() {
        // Укажи ID лога
        Long logId = 1L;
        
        AdminLogs log = adminLogsRepository.findById(logId).orElse(null);
        assertNotNull(log);
        System.out.println("AdminLogs READ OK - ID: " + logId + ", Action: " + log.getAction());
    }
}
