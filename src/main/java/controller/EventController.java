package com.event.management.controller;

import com.event.management.entity.Event;
import com.event.management.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventRepository repo;

    // CREATE (POST)
    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return repo.save(event);
    }

    // GET ALL
    @GetMapping
    public List<Event> getAllEvents() {
        return repo.findAll();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    // UPDATE (PUT)
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event newEvent) {

        return repo.findById(id).map(event -> {
            event.setEventName(newEvent.getEventName());
            event.setEventDate(newEvent.getEventDate());
            event.setLocation(newEvent.getLocation());
            return repo.save(event);
        }).orElse(null);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable Long id) {

        if (repo.existsById(id)) {
            repo.deleteById(id);
            return "Deleted successfully";
        } else {
            return "Event not found";
        }
    }
}