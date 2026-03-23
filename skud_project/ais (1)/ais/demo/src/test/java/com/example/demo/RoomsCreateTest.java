package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.model.dao.Rooms;
import com.example.demo.repository.RoomsRepository;

public class RoomsCreateTest extends BaseCrudTest {

    @Autowired
    private RoomsRepository roomsRepository;

    @Test
    void testCreate() {
        // String uid = UUID.randomUUID().toString().substring(0, 8);

        Rooms room = new Rooms();
        room.setName("Тайнаяя комната");
        room.setPurpose("Office");
        room.setAccessLevel("HIGH");

        room = roomsRepository.save(room);
        assertNotNull(room.getId());
        System.out.println("Rooms CREATE OK, id=" + room.getId());
    }
}
