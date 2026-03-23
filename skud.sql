-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Мар 22 2026 г., 16:41
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `skud`
--

-- --------------------------------------------------------

--
-- Структура таблицы `access_events`
--

CREATE TABLE `access_events` (
  `id` bigint(20) NOT NULL,
  `event_time` datetime DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `result` varchar(255) NOT NULL,
  `card_id` bigint(20) NOT NULL,
  `controller_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `room_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `access_events`
--

INSERT INTO `access_events` (`id`, `event_time`, `reason`, `result`, `card_id`, `controller_id`, `user_id`, `room_id`) VALUES
(1, '2026-03-20 22:24:30', 'Valid access rights', 'GRANTED', 1, 1, 1, 1),
(2, '2026-03-20 22:32:27', 'Действительные права доступа', 'GRANTED', 1, 1, 1, 1),
(3, '2026-03-20 23:04:04', 'Нет прав доступа к данной комнате', 'DENIED', 2, 2, 1, 2),
(4, '2026-03-20 23:05:00', 'Нет прав доступа к данной комнате', 'DENIED', 3, 1, 2, 1),
(5, '2026-03-20 23:05:22', 'Действительные права доступа', 'GRANTED', 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `access_rights`
--

CREATE TABLE `access_rights` (
  `id` bigint(20) NOT NULL,
  `schedule` varchar(255) DEFAULT NULL,
  `valid_from` datetime NOT NULL,
  `valid_to` datetime DEFAULT NULL,
  `room_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `access_rights`
--

INSERT INTO `access_rights` (`id`, `schedule`, `valid_from`, `valid_to`, `room_id`, `user_id`) VALUES
(1, '24/7', '2026-03-20 00:00:00', '2027-03-20 00:00:00', 1, 1),
(2, 'string', '2026-03-20 00:00:00', '2026-03-20 00:00:00', 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `admin_logs`
--

CREATE TABLE `admin_logs` (
  `id` bigint(20) NOT NULL,
  `action` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `admin_id` bigint(20) NOT NULL,
  `timestamp` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `cards`
--

CREATE TABLE `cards` (
  `id` bigint(20) NOT NULL,
  `card_number` varchar(255) DEFAULT NULL,
  `issue_date` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  `set_user` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `cards`
--

INSERT INTO `cards` (`id`, `card_number`, `issue_date`, `status`, `type`, `user_id`, `set_user`) VALUES
(1, 'ПАРСЕЛТАНГ-ГП-001', '2026-03-20 00:00:00', 'ACTIVE', 'Парselтang', 1, 0),
(2, 'ОБЫЧНАЯ-ГП-002', '2026-03-20 00:00:00', 'ACTIVE', 'RFID', 1, 0),
(3, 'ТЕМНАЯ-МАГИЯ-666', '1942-12-31 00:00:00', 'BLOCKED', 'Dark Magic', 2, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `controllers`
--

CREATE TABLE `controllers` (
  `id` bigint(20) NOT NULL,
  `device_type` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `room_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `controllers`
--

INSERT INTO `controllers` (`id`, `device_type`, `ip_address`, `status`, `room_id`, `name`) VALUES
(1, 'reader', '192.168.2.48', 'ONLINE', 1, 'Контроллер входа в Тайную комнату'),
(2, 'reader', '192.168.13.13', 'ONLINE', 2, 'Контроллер ворот Азкабана');

-- --------------------------------------------------------

--
-- Структура таблицы `rooms`
--

CREATE TABLE `rooms` (
  `id` bigint(20) NOT NULL,
  `access_level` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `purpose` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `rooms`
--

INSERT INTO `rooms` (`id`, `access_level`, `name`, `purpose`) VALUES
(1, 'ULTRA HIGH', 'Тайная комната', 'Древняя комната Слизерина'),
(2, 'MAXIMUM', 'Азкабан', 'Тюрьма для волшебников');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `created_at`, `email`, `full_name`, `password_hash`, `phone`, `position`, `status`, `role`) VALUES
(1, NULL, 'harry.potter@hogwarts.edu', 'Гарри Поттер', 'expecto_patronum', '+44-20-7946-0958', 'Студент', 'ACTIVE', 'USER'),
(2, NULL, 'voldemort@darkside.com', 'Волан-де-Морт', 'avada_kedavra', '+44-20-7946-0666', 'Темный Лорд', 'BLOCKED', 'USER');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `access_events`
--
ALTER TABLE `access_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK3wqxbps20wucu1fgr7qjiytil` (`card_id`),
  ADD KEY `FKjl01m73eg6eovjyc3op0slyw2` (`controller_id`),
  ADD KEY `FKkncmiajt7kdj21p46gj9a9a3k` (`user_id`),
  ADD KEY `FKbxfmbvxd6hhkql4m2i99q6yc9` (`room_id`);

--
-- Индексы таблицы `access_rights`
--
ALTER TABLE `access_rights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKdbgfy86hynvpj667fjb3ihjma` (`room_id`),
  ADD KEY `FKn9j0mpt75hy9dlb17jk0ha2t3` (`user_id`);

--
-- Индексы таблицы `admin_logs`
--
ALTER TABLE `admin_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKoix4xxbvhimiroqel44k3h7uk` (`admin_id`);

--
-- Индексы таблицы `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_qualp9iflk959u561wanavuj1` (`card_number`),
  ADD KEY `FKcmanafgwbibfijy2o5isfk3d5` (`user_id`);

--
-- Индексы таблицы `controllers`
--
ALTER TABLE `controllers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_d5rpp75p0bhi6rdu0k79kfqpo` (`ip_address`),
  ADD KEY `FKllus9qjwdmxllpho5boh9f0xi` (`room_id`);

--
-- Индексы таблицы `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_1kuqhbfxed2e8t571uo82n545` (`name`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `access_events`
--
ALTER TABLE `access_events`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `access_rights`
--
ALTER TABLE `access_rights`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `admin_logs`
--
ALTER TABLE `admin_logs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `cards`
--
ALTER TABLE `cards`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `controllers`
--
ALTER TABLE `controllers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `access_events`
--
ALTER TABLE `access_events`
  ADD CONSTRAINT `FK3wqxbps20wucu1fgr7qjiytil` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`),
  ADD CONSTRAINT `FKbxfmbvxd6hhkql4m2i99q6yc9` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`),
  ADD CONSTRAINT `FKjl01m73eg6eovjyc3op0slyw2` FOREIGN KEY (`controller_id`) REFERENCES `controllers` (`id`),
  ADD CONSTRAINT `FKkncmiajt7kdj21p46gj9a9a3k` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `access_rights`
--
ALTER TABLE `access_rights`
  ADD CONSTRAINT `FKdbgfy86hynvpj667fjb3ihjma` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`),
  ADD CONSTRAINT `FKn9j0mpt75hy9dlb17jk0ha2t3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `admin_logs`
--
ALTER TABLE `admin_logs`
  ADD CONSTRAINT `FKoix4xxbvhimiroqel44k3h7uk` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `FKcmanafgwbibfijy2o5isfk3d5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `controllers`
--
ALTER TABLE `controllers`
  ADD CONSTRAINT `FKllus9qjwdmxllpho5boh9f0xi` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
