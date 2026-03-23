package com.example.demo;

import com.example.demo.model.dao.AdminLogs;
import com.example.demo.repository.AdminLogsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class AdminLogsUpdateTest extends BaseCrudTest {

    @Autowired
    private AdminLogsRepository adminLogsRepository;

    @Test
    void testUpdate() {
        // Укажи ID лога
        Long logId = 1L;
        
        AdminLogs log = adminLogsRepository.findById(logId).orElseThrow();
        
        // Меняй что хочешь
        log.setAction("UPDATE_USER");
        log.setTimestamp(LocalDateTime.now());
        
        adminLogsRepository.save(log);

        AdminLogs updated = adminLogsRepository.findById(logId).orElse(null);
        assertNotNull(updated);
        System.out.println("AdminLogs UPDATE OK - New action: " + updated.getAction());
    }
}
