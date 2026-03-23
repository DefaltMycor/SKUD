package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;

@SpringBootTest
@Transactional
@Rollback(false)
public class DatabaseTruncateTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void truncateAllTables() {

        System.out.println("START TRUNCATE DB...");

        // Отключаем внешние ключи
        jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 0");

        // Чистим таблицы (порядок не важен при FK off)
        jdbcTemplate.execute("TRUNCATE TABLE access_events");
        jdbcTemplate.execute("TRUNCATE TABLE access_rights");
        jdbcTemplate.execute("TRUNCATE TABLE admin_logs");
        jdbcTemplate.execute("TRUNCATE TABLE cards");
        jdbcTemplate.execute("TRUNCATE TABLE controllers");
        jdbcTemplate.execute("TRUNCATE TABLE rooms");
        jdbcTemplate.execute("TRUNCATE TABLE users");

        // Включаем обратно
        jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 1");

        System.out.println("DATABASE FULLY TRUNCATED!");
    }
}
