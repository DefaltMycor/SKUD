package com.example.demo.repository;

import com.example.demo.model.dao.AccessRights;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessRightsRepository extends JpaRepository<AccessRights, Long> {
    
}
