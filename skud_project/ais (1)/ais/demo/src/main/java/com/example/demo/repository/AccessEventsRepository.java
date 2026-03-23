package com.example.demo.repository;

import com.example.demo.model.dao.AccessEvents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccessEventsRepository extends JpaRepository<AccessEvents, Long> {

    // поиск по пользователю
    List<AccessEvents> findByUserId(Long userId);

    // поиск по комнате
    List<AccessEvents> findByRoomId(Long roomId);

    // поиск по карте
    List<AccessEvents> findByCardId(Long cardId);
}
