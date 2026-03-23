package com.example.demo;

import com.example.demo.model.dao.*;
import com.example.demo.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

public class AdminLogsCreateTest extends BaseCrudTest {

    @Autowired private AdminLogsRepository adminLogsRepository;
    @Autowired private UsersRepository usersRepository;

    @Test
    void testCreate() {
        String uid = UUID.randomUUID().toString().substring(0, 8);

        // Admin user
        Users admin = new Users();
        admin.setFullName("Admin");
        admin.setEmail("admin_" + uid + "@test.com");
        admin.setRole("ADMIN");
        admin.setStatus("ACTIVE");
        admin.setPasswordHash("hash");
        admin = usersRepository.save(admin);

        // Log
        AdminLogs log = new AdminLogs();
        log.setAdmin(admin);
        log.setAction("CREATE_USER");
        log.setTimestamp(LocalDateTime.now());

        log = adminLogsRepository.save(log);
        assertNotNull(log.getId());
        System.out.println("AdminLogs CREATE OK, id=" + log.getId());
    }
}
