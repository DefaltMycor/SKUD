package com.example.demo;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.model.dao.AccessEvents;
import com.example.demo.model.dao.AccessRights;
import com.example.demo.model.dao.AdminLogs;
import com.example.demo.model.dao.Cards;
import com.example.demo.model.dao.Controllers;
import com.example.demo.model.dao.Rooms;
import com.example.demo.model.dao.Users;
import com.example.demo.repository.AccessEventsRepository;
import com.example.demo.repository.AccessRightsRepository;
import com.example.demo.repository.AdminLogsRepository;
import com.example.demo.repository.CardsRepository;
import com.example.demo.repository.ControllersRepository;
import com.example.demo.repository.RoomsRepository;
import com.example.demo.repository.UsersRepository;

/**
 * Creates test fixtures with known IDs for all tests to use.
 * Run this once before tests to populate the database.
 */
@Component
public class TestDataFixtures {

    @Autowired private UsersRepository usersRepository;
    @Autowired private RoomsRepository roomsRepository;
    @Autowired private CardsRepository cardsRepository;
    @Autowired private ControllersRepository controllersRepository;
    @Autowired private AccessRightsRepository accessRightsRepository;
    @Autowired private AccessEventsRepository accessEventsRepository;
    @Autowired private AdminLogsRepository adminLogsRepository;

    // Known IDs for tests to reference
    public static Long TEST_USER_ID;
    public static Long TEST_ROOM_ID;
    public static Long TEST_CARD_ID;
    public static Long TEST_CONTROLLER_ID;
    public static Long TEST_ACCESS_RIGHT_ID;
    public static Long TEST_ACCESS_EVENT_ID;
    public static Long TEST_ADMIN_LOG_ID;

    @PostConstruct
    public void createTestData() {
        // Only create if not already present
        if (usersRepository.count() > 0) {
            return; // Already initialized
        }

        // Create test user
        Users user = new Users();
        user.setFullName("Test User");
        user.setEmail("testuser@test.com");
        user.setPhone("1234567890");
        user.setPosition("Engineer");
        user.setStatus("ACTIVE");
        user.setRole("USER");
        user.setPasswordHash("hashed_password");
        user = usersRepository.save(user);
        TEST_USER_ID = user.getId();

        // Create test room
        Rooms room = new Rooms();
        room.setName("Test Room");
        room.setPurpose("Testing");
        room.setAccessLevel("HIGH");
        room = roomsRepository.save(room);
        TEST_ROOM_ID = room.getId();

        // Create test card
        Cards card = new Cards();
        card.setCardNumber("CARD-001");
        card.setType("RFID");
        card.setStatus("ACTIVE");
        card.setIssueDate(LocalDate.now());
        card.setUser(user);
        card = cardsRepository.save(card);
        TEST_CARD_ID = card.getId();

        // Create test controller
        Controllers controller = new Controllers();
        controller.setName("Test Controller");
        controller.setDeviceType("Access Point");
        controller.setIpAddress("192.168.1.100");
        controller.setStatus("ONLINE");
        controller.setRoom(room);
        controller = controllersRepository.save(controller);
        TEST_CONTROLLER_ID = controller.getId();

        // Create test access right
        AccessRights rights = new AccessRights();
        rights.setUser(user);
        rights.setRoom(room);
        rights.setSchedule("24/7");
        rights.setValidFrom(LocalDate.now());
        rights.setValidTo(LocalDate.now().plusDays(365));
        rights = accessRightsRepository.save(rights);
        TEST_ACCESS_RIGHT_ID = rights.getId();

        // Create test access event
        AccessEvents event = new AccessEvents();
        event.setUser(user);
        event.setRoom(room);
        event.setCard(card);
        event.setController(controller);
        event.setEventTime(LocalDateTime.now());
        event.setResult("GRANTED");
        event.setReason("Test event");
        event = accessEventsRepository.save(event);
        TEST_ACCESS_EVENT_ID = event.getId();

        // Create test admin log
        AdminLogs log = new AdminLogs();
        log.setAdmin(user);
        log.setAction("TEST_ACTION");
        log.setTimestamp(LocalDateTime.now());
        log = adminLogsRepository.save(log);
        TEST_ADMIN_LOG_ID = log.getId();

        System.out.println("=== Test Fixtures Created ===");
        System.out.println("User ID: " + TEST_USER_ID);
        System.out.println("Room ID: " + TEST_ROOM_ID);
        System.out.println("Card ID: " + TEST_CARD_ID);
        System.out.println("Controller ID: " + TEST_CONTROLLER_ID);
        System.out.println("Access Right ID: " + TEST_ACCESS_RIGHT_ID);
        System.out.println("Access Event ID: " + TEST_ACCESS_EVENT_ID);
        System.out.println("Admin Log ID: " + TEST_ADMIN_LOG_ID);
        System.out.println("=============================");
    }
}
