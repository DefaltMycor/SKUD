package com.example.demo;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.model.dao.Cards;
import com.example.demo.repository.CardsRepository;

public class CardsUpdateTest extends BaseCrudTest {

    @Autowired
    private CardsRepository cardsRepository;

    @Test
    void testUpdate() {
        // ID карты
        Long cardId = 4L;
        
        Cards card = cardsRepository.findById(cardId).orElseThrow();
        
        // change
        card.setCardNumber("upd2102");
        card.setType("upd2102");
        card.setStatus("upd2102");
        card.setIssueDate(LocalDate.now().minusDays(30));
        
        cardsRepository.save(card);

        Cards updated = cardsRepository.findById(cardId).orElse(null);
        assertNotNull(updated);
        System.out.println("Cards UPDATE OK - New number: " + updated.getCardNumber());
    }
}
