package com.example.demo;

import com.example.demo.model.dao.AccessRights;
import com.example.demo.repository.AccessRightsRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

public class AccessRightsUpdateTest extends BaseCrudTest {

    @Autowired
    private AccessRightsRepository accessRightsRepository;

    @Test
    void testUpdate() {
        // Укажи ID прав доступа
        Long rightsId = 1L;
        
        AccessRights rights = accessRightsRepository.findById(rightsId).orElseThrow();
        
        // Меняй что хочешь
        rights.setSchedule("24/7");
        rights.setValidFrom(LocalDate.now().minusDays(10));
        rights.setValidTo(LocalDate.now().plusDays(90));
        
        accessRightsRepository.save(rights);

        AccessRights updated = accessRightsRepository.findById(rightsId).orElse(null);
        assertNotNull(updated);
        System.out.println("AccessRights UPDATE OK - New schedule: " + updated.getSchedule());
    }
}
