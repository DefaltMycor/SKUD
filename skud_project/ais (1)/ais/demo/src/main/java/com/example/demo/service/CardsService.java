package com.example.demo.service;

import com.example.demo.model.dao.Cards;
import com.example.demo.repository.CardsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardsService {

    private final CardsRepository repository;

    public CardsService(CardsRepository repository) {
        this.repository = repository;
    }

    public List<Cards> getAll() {
        return repository.findAll();
    }

    public Optional<Cards> getById(Long id) {
        return repository.findById(id);
    }

    public Cards create(Cards card) {
        if (card.getStatus() == null) {
            card.setStatus("ACTIVE");
        }
        return repository.save(card);
    }

    public Cards update(Long id, Cards updated) {
        return repository.findById(id)
                .map(c -> {
                    c.setCardNumber(updated.getCardNumber());
                    c.setStatus(updated.getStatus());
                    return repository.save(c);
                })
                .orElseThrow();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
