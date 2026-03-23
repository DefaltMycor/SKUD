Веб-приложение системы контроля и управления доступом (СКУД), реализованное по клиент-серверной архитектуре с использованием Spring Boot, React, MariaDB и REST API.

Проект позволяет управлять пользователями, картами доступа, правами доступа и журналом событий, а также выполнять административный контроль через веб-интерфейс.

Функциональные возможности

Пользователь (USER):

авторизация в системе

просмотр личных данных

просмотр доступных зон доступа

просмотр истории проходов

получение QR-кода доступа

Администратор (ADMIN):

просмотр списка пользователей

создание, редактирование и удаление пользователей

управление картами доступа

управление правами доступа

просмотр отчетов и событий доступа

мониторинг активности системы

Архитектура системы

Система построена по трёхуровневой клиент-серверной архитектуре:

Frontend (React) → REST API (Spring Boot) → Database (MariaDB)

Взаимодействие между слоями осуществляется через HTTP-запросы в формате JSON.

Стек технологий

Backend:

Java 21

Spring Boot 2.7.3

Spring Data JPA

Hibernate ORM

Spring Security

Maven

Swagger UI

Frontend:

React

TypeScript

Vite

React Router

Database:

MariaDB

Тестирование:

Locust

Swagger UI

htop

atop

Структура проекта

demo/

src/main/java/com/example/demo

controller

service

repository

model/dao

DemoApplication.java

src/main/resources

application.properties

skud_front/

src/

components/

pages/

main.tsx

Запуск backend

Перейти в каталог проекта:

cd demo

Собрать проект:

./mvnw clean package -DskipTests

Запустить сервер:

java -jar target/demo-0.0.1-SNAPSHOT.jar

Приложение будет доступно по адресу:

http://localhost:8081

Запуск frontend

Перейти в каталог клиента:

cd demo/skud_front

Установить зависимости:

npm install

Запустить приложение:

npm run dev

Frontend будет доступен по адресу:

http://localhost:5173

Документация API

После запуска backend доступна документация Swagger:

http://localhost:8081/swagger-ui/index.html

Позволяет:

просматривать endpoints

отправлять тестовые запросы

проверять структуру JSON

Тестовые учетные записи

Администратор:

email: admin@demo.local

password: admin123

Пользователь:

email: user@demo.local

password: user123

Нагрузочное тестирование

Для нагрузочного тестирования используется Locust.

Запуск:

locust -f locustfile.py --host=http://localhost:8081

Интерфейс Locust доступен по адресу:

http://localhost:8089

Позволяет:

эмулировать пользователей

тестировать REST API

анализировать производительность системы

Мониторинг ресурсов

Во время нагрузочного тестирования использовались:

htop

и

atop

для анализа загрузки CPU, RAM и дисковой подсистемы.

Основные сущности системы

В базе данных используются следующие таблицы:

usersc(пользователи)
cards (карты пользователей)
rooms ( помещения)
access_rights (права доступа к помещениям)
access_events (история проходов в помещения)
admin_logs
controllers (контроллеры установленные на дверях для считывания карт)
