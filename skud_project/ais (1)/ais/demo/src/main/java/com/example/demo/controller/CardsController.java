package com.example.demo.controller;

import com.example.demo.model.dao.Cards;
import com.example.demo.repository.CardsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/cards")
@CrossOrigin
public class CardsController {

    private final CardsRepository cardsRepository;

    public CardsController(CardsRepository cardsRepository) {
        this.cardsRepository = cardsRepository;
    }

    @GetMapping
    public List<Cards> getAll() {
        return cardsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Cards getById(@PathVariable Long id) {
        return cardsRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Карта с ID " + id + " не найдена"));
    }

    @PostMapping
    public Cards create(@RequestBody Cards card) {
        return cardsRepository.save(card);
    }

    @PutMapping("/{id}")
    public Cards update(@PathVariable Long id, @RequestBody Cards updated) {
        return cardsRepository.findById(id).map(card -> {
            card.setCardNumber(updated.getCardNumber());
            card.setType(updated.getType());
            card.setStatus(updated.getStatus());
            card.setIssueDate(updated.getIssueDate());
            card.setUser(updated.getUser());
            return cardsRepository.save(card);
        }).orElseThrow(() -> new NoSuchElementException("Карта с ID " + id + " не найдена"));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!cardsRepository.existsById(id)) {
            throw new NoSuchElementException("Карта с ID " + id + " не найдена");
        }
        cardsRepository.deleteById(id);
    }
}
