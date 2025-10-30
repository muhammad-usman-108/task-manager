package com.example.backend.service;

import com.example.backend.entity.Task;
import com.example.backend.exception.NotFoundException;
import com.example.backend.repository.TaskRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TaskService {

    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public Task create(Task t) {
        return repo.save(t);
    }

    public Task update(Long id, Task updated) {
        Task existing = repo.findById(id).orElseThrow(() -> new NotFoundException("Task not found: " + id));
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setStatus(updated.getStatus());
        return repo.save(existing);
    }

    public Task findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("Task not found: " + id));
    }

    public List<Task> findAll() {
        return repo.findAll();
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new NotFoundException("Task not found: " + id);
        }
        repo.deleteById(id);
    }

    public Page<Task> findPaginated(int page, int size) {
        return repo.findAll(PageRequest.of(page, size));
    }
}
