package com.example.backend.config;

import com.example.backend.entity.Task;
import com.example.backend.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Random;

@Configuration
public class DataInitializer {

    private final String[] sampleStatuses = {"Pending", "In Progress", "Completed"};
    private final String[] sampleNames = {
            "Buy groceries", "Read a book", "Write report",
            "Clean room", "Workout", "Call friend", "Fix bug",
            "Update resume", "Plan trip", "Watch movie"
    };

    @Bean
    CommandLineRunner initDatabase(TaskRepository taskRepository) {
        return args -> {
            if (taskRepository.count() == 0) { // only add if empty
                Random random = new Random();
                for (int i = 1; i <= 20; i++) {
                    String name = sampleNames[random.nextInt(sampleNames.length)] + " #" + i;
                    String description = "This is task description " + i;
                    String status = sampleStatuses[random.nextInt(sampleStatuses.length)];
                    Task task = new Task(name, description, status);
                    taskRepository.save(task);
                }
                System.out.println("Inserted 20 random tasks into the database.");
            }
        };
    }
}
