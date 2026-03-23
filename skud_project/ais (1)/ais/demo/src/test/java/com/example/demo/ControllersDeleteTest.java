package com.example.demo;

import com.example.demo.repository.ControllersRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class ControllersDeleteTest extends BaseCrudTest {

    @Autowired
    private ControllersRepository controllersRepository;

    @Test
    void testDelete() {
        // Укажи ID контроллера
        Long controllerId = 1L;
        
        controllersRepository.deleteById(controllerId);
        assertFalse(controllersRepository.findById(controllerId).isPresent());
        System.out.println("Controllers DELETE OK - ID: " + controllerId);
    }
}
