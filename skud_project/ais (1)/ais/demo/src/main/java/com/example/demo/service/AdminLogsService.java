package com.example.demo.service;

import com.example.demo.model.dao.AdminLogs;
import com.example.demo.repository.AdminLogsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@Transactional
public class AdminLogsService {
    private final AdminLogsRepository repo;


    public AdminLogsService(AdminLogsRepository repo) { this.repo = repo; }


    public AdminLogs create(AdminLogs log) { return repo.save(log); }


    public AdminLogs read(Long id) { return repo.findById(id).orElseThrow(() -> new EntityNotFoundException("Лог с id=" + id + " не найден")); }


    public List<AdminLogs> readAll(Long adminId) {
        if (adminId != null) return repo.findByAdminId(adminId);
        return repo.findAll();
    }


    public AdminLogs update(Long id, AdminLogs upd) {
        throw new UnsupportedOperationException("AdminLogs updates are not allowed (audit trail)");
    }


    public void delete(Long id) {
        throw new UnsupportedOperationException("AdminLogs deletion is restricted to archival processes");
    }
}