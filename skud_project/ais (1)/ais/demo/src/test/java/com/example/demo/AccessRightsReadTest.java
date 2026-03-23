package com.example.demo;

import com.example.demo.model.dao.AccessRights;
import com.example.demo.repository.AccessRightsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

public class AccessRightsReadTest extends BaseCrudTest {

    @Autowired
    private AccessRightsRepository accessRightsRepository;

    @Test
    void testRead() {
        // Укажи ID прав доступа
        Long rightsId = 1L;
        
        AccessRights rights = accessRightsRepository.findById(rightsId).orElse(null);
        assertNotNull(rights);
        System.out.println("AccessRights READ OK - ID: " + rightsId + ", Schedule: " + rights.getSchedule());
    }
}
