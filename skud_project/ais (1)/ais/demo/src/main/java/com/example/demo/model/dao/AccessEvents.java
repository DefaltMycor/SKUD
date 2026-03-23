package com.example.demo.model.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "access_events")
public class AccessEvents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Users user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Rooms room;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "card_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Cards card;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "controller_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Controllers controller;

    @Column(name = "event_time")
    private LocalDateTime eventTime = LocalDateTime.now();

    private String result;
    private String reason;

    public AccessEvents() {}

    public Long getId() { return id; }

    public Users getUser() { return user; }
    public void setUser(Users user) { this.user = user; }

    public Rooms getRoom() { return room; }
    public void setRoom(Rooms room) { this.room = room; }

    public Cards getCard() { return card; }
    public void setCard(Cards card) { this.card = card; }

    public Controllers getController() { return controller; }
    public void setController(Controllers controller) { this.controller = controller; }

    public LocalDateTime getEventTime() { return eventTime; }
    public void setEventTime(LocalDateTime eventTime) { this.eventTime = eventTime; }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
