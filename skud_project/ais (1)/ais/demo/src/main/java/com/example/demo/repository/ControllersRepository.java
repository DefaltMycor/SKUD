package com.example.demo.repository;

import com.example.demo.model.dao.Controllers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ControllersRepository extends JpaRepository<Controllers, Long> {
    List<Controllers> findByRoomId(Long roomId);
}