package com.example.demo;

import com.example.demo.model.dao.*;
import com.example.demo.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

public class ControllersCreateTest extends BaseCrudTest {

    @Autowired private ControllersRepository controllersRepository;
    @Autowired private RoomsRepository roomsRepository;

    @Test
    void testCreate() {
        String uid = UUID.randomUUID().toString().substring(0, 8);

        // Сначала нужна комната
        Rooms room = new Rooms();
        room.setName("Ctrl Room " + uid);
        room.setPurpose("Lab");
        room.setAccessLevel("MEDIUM");
        room = roomsRepository.save(room);

        // Создаём контроллер
        Controllers controller = new Controllers();
        controller.setName("Controller " + uid);
        controller.setDeviceType("Access Point");
        controller.setIpAddress("192.168.1." + (int)(Math.random()*255));
        controller.setStatus("ONLINE");
        controller.setRoom(room);

        controller = controllersRepository.save(controller);
        assertNotNull(controller.getId());
        System.out.println("Controllers CREATE OK, id=" + controller.getId());
    }
}
