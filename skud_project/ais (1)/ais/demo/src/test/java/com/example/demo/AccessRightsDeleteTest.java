package com.example.demo;

import com.example.demo.repository.AccessRightsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class AccessRightsDeleteTest extends BaseCrudTest {

    @Autowired
    private AccessRightsRepository accessRightsRepository;

    @Test
    void testDelete() {
        // Укажи ID прав доступа
        Long rightsId = 1L;
        
        accessRightsRepository.deleteById(rightsId);
        assertFalse(accessRightsRepository.findById(rightsId).isPresent());
        System.out.println("AccessRights DELETE OK - ID: " + rightsId);
    }
}
