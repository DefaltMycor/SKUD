package com.example.demo;

import com.example.demo.model.dao.Controllers;
import com.example.demo.repository.ControllersRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class ControllersUpdateTest extends BaseCrudTest {

    @Autowired
    private ControllersRepository controllersRepository;

    @Test
    void testUpdate() {
        // Укажи ID контроллера
        Long controllerId = 1L;
        
        Controllers controller = controllersRepository.findById(controllerId).orElseThrow();
        
        // Меняй что хочешь
        controller.setName("Updated Controller");
        controller.setDeviceType("RFID Reader");
        controller.setStatus("OFFLINE");
        controller.setIpAddress("10.0.0.100");
        
        controllersRepository.save(controller);

        Controllers updated = controllersRepository.findById(controllerId).orElse(null);
        assertNotNull(updated);
        System.out.println("Controllers UPDATE OK - New name: " + updated.getName());
    }
}
