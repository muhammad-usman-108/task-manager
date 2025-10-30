package com.example.backend.controller;

import com.example.backend.dto.CreateTaskRequest;
import com.example.backend.dto.UpdateTaskRequest;
import com.example.backend.entity.Task;
import com.example.backend.service.TaskService;
import org.springframework.data.domain.Page;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public Page<Task> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return service.findPaginated(page, size);
    }


    @GetMapping("/{id}")
    public Task get(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<Task> create(@Valid @RequestBody CreateTaskRequest req) {
        Task t = new Task(req.getName(), req.getDescription(), req.getStatus());
        Task created = service.create(t);
        return ResponseEntity.created(URI.create("/api/tasks/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @Valid @RequestBody UpdateTaskRequest req) {
        Task updated = new Task(req.getName(), req.getDescription(), req.getStatus());
        return service.update(id, updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
