package com.example.demo;

import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.model.dao.Cards;
import com.example.demo.model.dao.Users;
import com.example.demo.repository.CardsRepository;
import com.example.demo.repository.UsersRepository;

public class CardsCreateTest extends BaseCrudTest {

    @Autowired private CardsRepository cardsRepository;
    @Autowired private UsersRepository usersRepository;

    @Test
    void testCreate() {
        String uid = UUID.randomUUID().toString().substring(0, 8);

        // нужен user
        Users user = new Users();
        user.setFullName("test1403");
        user.setEmail("owner_" + uid + "@test.com");
        user.setPhone("000");
        user.setRole("USER");
        user.setStatus("ACTIVE");
        user.setPasswordHash("hash");
        user = usersRepository.save(user);

        // создаем карту
        Cards card = new Cards();
        card.setCardNumber("test1403");
        card.setType("test1403");
        card.setStatus("test1403");
        card.setIssueDate(LocalDate.now());
        card.setUser(user);

        card = cardsRepository.save(card);
        assertNotNull(card.getId());
        System.out.println("Cards CREATE OK, id=" + card.getId());
    }
}
