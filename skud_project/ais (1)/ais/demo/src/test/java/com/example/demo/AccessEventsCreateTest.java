package com.example.demo;

import com.example.demo.model.dao.*;
import com.example.demo.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

public class AccessEventsCreateTest extends BaseCrudTest {

    @Autowired private AccessEventsRepository accessEventsRepository;
    @Autowired private UsersRepository usersRepository;
    @Autowired private CardsRepository cardsRepository;
    @Autowired private ControllersRepository controllersRepository;
    @Autowired private RoomsRepository roomsRepository;

    @Test
    void testCreate() {
        String uid = UUID.randomUUID().toString().substring(0, 8);

        // User
        Users user = new Users();
        user.setFullName("Event User");
        user.setEmail("event_" + uid + "@test.com");
        user.setRole("USER");
        user.setStatus("ACTIVE");
        user.setPasswordHash("hash");
        user = usersRepository.save(user);

        // Room
        Rooms room = new Rooms();
        room.setName("Event Room");
        room.setAccessLevel("HIGH");
        room.setPurpose("Test");
        room = roomsRepository.save(room);

        // Controller
        Controllers controller = new Controllers();
        controller.setName("Event Controller");
        controller.setDeviceType("Reader");
        controller.setIpAddress("192.168.1.1");
        controller.setStatus("ACTIVE");
        controller.setRoom(room);
        controller = controllersRepository.save(controller);

        // Card
        Cards card = new Cards();
        card.setCardNumber("EVT-" + uid);
        card.setType("RFID");
        card.setStatus("ACTIVE");
        card.setIssueDate(LocalDate.now());
        card.setUser(user);
        card = cardsRepository.save(card);

        // Event
        AccessEvents event = new AccessEvents();
        event.setUser(user);
        event.setRoom(room);
        event.setCard(card);
        event.setController(controller);
        event.setEventTime(LocalDateTime.now());
        event.setResult("GRANTED");
        event.setReason("Test");

        event = accessEventsRepository.save(event);
        assertNotNull(event.getId());
        System.out.println("AccessEvents CREATE OK, id=" + event.getId());
    }
}
