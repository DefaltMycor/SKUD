# 🛡️ СКУД - Система Контроля и Управления Доступом

<div align="center">

![СКУД Logo](https://img.shields.io/badge/СКУД-Access%20Control%20System-blue?style=for-the-badge)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=flat-square&logo=spring)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

**Современная система контроля доступа с веб-интерфейсом**

[Демо](#-демо) • [Функции](#-функции) • [Установка](#-установка) • [API](#-api-документация) • [Скриншоты](#-скриншоты)

</div>

---

## 📋 Описание

СКУД - это полнофункциональная система контроля и управления доступом (Access Control System), разработанная для управления физическим доступом сотрудников к различным зонам здания.

### ⚡ Ключевые возможности

- 🔐 **Управление доступом** - Гибкая настройка прав доступа для пользователей
- 📱 **QR-коды** - Генерация временных QR-кодов для прохода
- 📊 **Аналитика** - Подробные отчёты о проходах и событиях доступа
- 👥 **Управление пользователями** - Полный CRUD для пользователей и карт доступа
- 🎨 **Современный UI** - Красивый интерфейс на React + shadcn/ui
- 🔄 **Real-time** - Мгновенное обновление данных
- 📦 **REST API** - Полноценное API для интеграции

---

## 🏗️ Архитектура

```
┌─────────────────┐      REST API      ┌──────────────────┐
│   Frontend      │ ◄─────────────────►│   Backend        │
│   React + TS    │   JSON/HTTP        │   Spring Boot    │
│   Vite          │                    │   Java 17        │
└─────────────────┘                    └──────────────────┘
                                                │
                                                ▼
                                       ┌──────────────────┐
                                       │   Database       │
                                       └──────────────────┘
```

### 🛠️ Технологический стек

#### Backend

- **Spring Boot 3.x** - Основной фреймворк
- **Spring Data JPA** - ORM для работы с БД
- **PostgreSQL** - Реляционная база данных
- **Maven** - Управление зависимостями
- **Hibernate** - ORM провайдер

#### Frontend

- **React 18.3** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Сборщик и dev-сервер
- **shadcn/ui** - Компоненты UI
- **Tailwind CSS** - Стилизация
- **Lucide React** - Иконки

---

## 🚀 Быстрый старт

### Предварительные требования

- ☕ **Java 17+**
- 📦 **Node.js 18+**
- 🐘 **PostgreSQL 14+**
- 🔧 **Maven 3.8+**

### 📥 Установка

#### 1. Клонировать репозиторий

```bash
git clone https://github.com/DefaltMycor/SKUD.git
cd SKUD
```

#### 2. Настроить базу данных

```sql
-- Создать БД
CREATE DATABASE skud_db;

-- Применить миграции (автоматически при запуске)
```

Настроить `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/skud_db
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8081
```

#### 3. Запустить Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend запустится на `http://localhost:8081`

#### 4. Запустить Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend запустится на `http://localhost:3000`

---

## 📚 Структура проекта

```
SKUD/
├── backend/                          # Spring Boot приложение
│   ├── src/main/java/com/example/demo/
│   │   ├── config/                  # Конфигурация (CORS, Security)
│   │   ├── controller/              # REST контроллеры
│   │   ├── model/dao/               # Entity классы
│   │   ├── repository/              # JPA репозитории
│   │   └── service/                 # Бизнес-логика
│   └── pom.xml                      # Maven зависимости
│
├── frontend/                         # React приложение
│   ├── src/
│   │   ├── api/                     # API клиент
│   │   ├── components/              # React компоненты
│   │   │   ├── ui/                  # shadcn/ui компоненты
│   │   │   ├── AdminPanel.tsx       # Панель администратора
│   │   │   ├── AccessReports.tsx    # Отчёты
│   │   │   ├── UserDashboard.tsx    # Личный кабинет
│   │   │   └── AccessEmulator.tsx   # Эмулятор прикладывания карт
│   │   ├── hooks/                   # React хуки
│   │   └── App.tsx                  # Главный компонент
│   └── package.json
│
└── scripts/                          # Утилиты и скрипты
    ├── setup_harry_potter.py        # Создание тестовых данных
    └── access_emulator.py           # Python эмулятор СКУД
```

---

## 🎯 Основные функции

### 👨‍💼 Панель администратора

- ✅ Управление пользователями (CRUD)
- ✅ Управление картами доступа
- ✅ Настройка прав доступа к зонам
- ✅ Управление контроллерами
- ✅ Просмотр логов администратора

### 👤 Личный кабинет пользователя

- ✅ Генерация временных QR-кодов
- ✅ Просмотр доступных зон
- ✅ История проходов
- ✅ Уведомления о событиях

### 📊 Отчёты и аналитика

- ✅ Журнал всех событий доступа
- ✅ Фильтрация по статусу, локации, времени
- ✅ Статистика проходов
- ✅ Экспорт отчётов в CSV
- ✅ Поиск по пользователям и событиям

### 🎮 Эмулятор доступа

- ✅ Симуляция прикладывания карты
- ✅ Проверка прав доступа в реальном времени
- ✅ Запись событий в БД
- ✅ Визуализация результата (Доступ разрешён/запрещён)

---

## 📡 API Документация

### 🔗 Базовый URL

```
http://localhost:8081/api
```

### 📋 Endpoints

<details>
<summary><b>👥 Users (Пользователи)</b></summary>

```http
GET    /api/users           # Получить всех пользователей
GET    /api/users/{id}      # Получить пользователя по ID
POST   /api/users           # Создать пользователя
PUT    /api/users/{id}      # Обновить пользователя
DELETE /api/users/{id}      # Удалить пользователя
```

**Пример тела запроса:**

```json
{
  "fullName": "Иван Петров",
  "email": "ivan@company.com",
  "phone": "+7-999-123-4567",
  "position": "Инженер",
  "status": "ACTIVE",
  "role": "USER",
  "passwordHash": "hashed_password"
}
```

</details>

<details>
<summary><b>💳 Cards (Карты доступа)</b></summary>

```http
GET    /api/cards           # Получить все карты
GET    /api/cards/{id}      # Получить карту по ID
POST   /api/cards           # Создать карту
PUT    /api/cards/{id}      # Обновить карту
DELETE /api/cards/{id}      # Удалить карту
```

</details>

<details>
<summary><b>🚪 Rooms (Комнаты)</b></summary>

```http
GET    /api/rooms           # Получить все комнаты
POST   /api/rooms           # Создать комнату
PUT    /api/rooms/{id}      # Обновить комнату
DELETE /api/rooms/{id}      # Удалить комнату
```

</details>

<details>
<summary><b>🎛️ Controllers (Контроллеры)</b></summary>

```http
GET    /api/controllers              # Получить все контроллеры
GET    /api/controllers/{id}         # Получить контроллер по ID
GET    /api/controllers/room/{roomId} # Получить контроллеры комнаты
POST   /api/controllers              # Создать контроллер
PUT    /api/controllers/{id}         # Обновить контроллер
DELETE /api/controllers/{id}         # Удалить контроллер
```

</details>

<details>
<summary><b>🔑 Access Rights (Права доступа)</b></summary>

```http
GET    /api/access-rights      # Получить все права
POST   /api/access-rights      # Создать права доступа
PUT    /api/access-rights/{id} # Обновить права
DELETE /api/access-rights/{id} # Удалить права
```

</details>

<details>
<summary><b>📋 Access Events (События доступа)</b></summary>

```http
GET    /api/access-events      # Получить все события
GET    /api/access-events/{id} # Получить событие по ID
POST   /api/access-events      # Создать событие
PUT    /api/access-events/{id} # Обновить событие
DELETE /api/access-events/{id} # Удалить событие
```

</details>

### 📖 Swagger UI

После запуска backend, Swagger доступен по адресу:

```
http://localhost:8081/swagger-ui.html
```

---

## 🖼️ Скриншоты

### Панель администратора

![Admin Panel](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Admin+Panel)

_Управление пользователями с CRUD операциями_

### Отчёты о доступе

![Access Reports](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Access+Reports)

_Журнал событий с фильтрацией и экспортом_

### Личный кабинет

![User Dashboard](https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=User+Dashboard)

_QR-код для прохода и история событий_

---

## 🧪 Тестовые данные

### Автоматическое создание тестовых данных

Запустите Python скрипт для создания тестового окружения:

```bash
# Создать тестовых пользователей (Гарри Поттер, Волан-де-Морт)
python scripts/setup_harry_potter.py

# Запустить интерактивный эмулятор
python scripts/access_emulator.py
```

### Тестовые сценарии

После создания данных будут доступны:

- 👤 **2 пользователя**: Гарри Поттер (доступ разрешён), Волан-де-Морт (заблокирован)
- 🚪 **2 комнаты**: Тайная комната, Азкабан
- 💳 **3 карты**: 2 у Гарри (одна с доступом, одна без), 1 у Волдеморта
- 🎛️ **2 контроллера**: По одному для каждой комнаты

---

## 🔧 Разработка

### Запуск в режиме разработки

**Backend:**

```bash
mvn spring-boot:run
# или
mvn clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

**Frontend:**

```bash
npm run dev
```

### Сборка для продакшена

**Backend:**

```bash
mvn clean package -DskipTests
```

**Frontend:**

```bash
npm run build
```

---

## 🤝 Вклад в проект

Приветствуются любые вклады!

1. Fork проекта
2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

---

## 📝 TODO

- [ ] Добавить аутентификацию JWT
- [ ] Интеграция с биометрическими сканерами
- [ ] Мобильное приложение
- [ ] Поддержка RFID карт
- [ ] Интеграция с Active Directory
- [ ] Email уведомления
- [ ] Двухфакторная аутентификация
- [ ] Dashboard с графиками в реальном времени
- [ ] Экспорт отчётов в PDF
- [ ] Многоязычность (i18n)

---

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл [LICENSE](LICENSE) для подробностей.

---

## 👨‍💻 Автор

**DefaltMycor**

- GitHub: [@DefaltMycor](https://github.com/DefaltMycor)
- Repository: [SKUD](https://github.com/DefaltMycor/SKUD)

---

## ресурсы

- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://reactjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---
