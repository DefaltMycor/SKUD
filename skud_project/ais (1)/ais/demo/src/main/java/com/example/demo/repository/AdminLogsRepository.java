package com.example.demo.repository;

import com.example.demo.model.dao.AdminLogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface AdminLogsRepository extends JpaRepository<AdminLogs, Long> {
    List<AdminLogs> findByAdminId(Long adminId);

    @Override
    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("delete from AdminLogs a where a.id = :id")
    void deleteById(Long id);
}
