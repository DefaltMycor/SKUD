package com.example.demo;

import com.example.demo.model.dao.Controllers;
import com.example.demo.repository.ControllersRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class ControllersReadTest extends BaseCrudTest {

    @Autowired
    private ControllersRepository controllersRepository;

    @Test
    void testRead() {
        // Укажи ID контроллера
        Long controllerId = 1L;
        
        Controllers controller = controllersRepository.findById(controllerId).orElse(null);
        assertNotNull(controller);
        System.out.println("Controllers READ OK - ID: " + controllerId + ", Name: " + controller.getName());
    }
}
