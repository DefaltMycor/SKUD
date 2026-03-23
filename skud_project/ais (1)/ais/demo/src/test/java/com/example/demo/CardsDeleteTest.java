package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.repository.CardsRepository;

public class CardsDeleteTest extends BaseCrudTest {

    @Autowired
    private CardsRepository cardsRepository;

    @Test
    void testDelete() {
        //id
        Long cardId = 4L;
        
        cardsRepository.deleteById(cardId);
        assertFalse(cardsRepository.findById(cardId).isPresent());
        System.out.println("Cards DELETE OK - ID: " + cardId);
    }
}
