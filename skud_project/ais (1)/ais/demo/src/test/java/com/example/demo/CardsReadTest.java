package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.model.dao.Cards;
import com.example.demo.repository.CardsRepository;

public class CardsReadTest extends BaseCrudTest {

    @Autowired
    private CardsRepository cardsRepository;

    @Test
    void testRead() {
        // id
        Long cardId = 1L;
        
        Cards card = cardsRepository.findById(cardId).orElse(null);
        assertNotNull(card);
        System.out.println("Cards READ OK - ID: " + cardId + ", Number: " + card.getCardNumber());
    }
}
