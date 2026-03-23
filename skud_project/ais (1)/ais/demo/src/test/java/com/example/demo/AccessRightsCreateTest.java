package com.example.demo;

import com.example.demo.model.dao.*;
import com.example.demo.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

public class AccessRightsCreateTest extends BaseCrudTest {

    @Autowired private AccessRightsRepository accessRightsRepository;
    @Autowired private UsersRepository usersRepository;
    @Autowired private RoomsRepository roomsRepository;

    @Test
    void testCreate() {
        String uid = UUID.randomUUID().toString().substring(0, 8);

        // Создаём user
        Users user = new Users();
        user.setFullName("Rights User");
        user.setEmail("rights_" + uid + "@test.com");
        user.setRole("USER");
        user.setStatus("ACTIVE");
        user.setPasswordHash("hash");
        user = usersRepository.save(user);

        // Создаём room
        Rooms room = new Rooms();
        room.setName("Rights Room " + uid);
        room.setAccessLevel("HIGH");
        room.setPurpose("Secure");
        room = roomsRepository.save(room);

        // Создаём права доступа
        AccessRights rights = new AccessRights();
        rights.setUser(user);
        rights.setRoom(room);
        rights.setSchedule("9-17");
        rights.setValidFrom(LocalDate.now());
        rights.setValidTo(LocalDate.now().plusDays(30));

        rights = accessRightsRepository.save(rights);
        assertNotNull(rights.getId());
        System.out.println("AccessRights CREATE OK, id=" + rights.getId());
    }
}
