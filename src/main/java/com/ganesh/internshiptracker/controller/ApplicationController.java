package com.ganesh.internshiptracker.controller;

import com.ganesh.internshiptracker.model.Application;
import com.ganesh.internshiptracker.service.ApplicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping
    public Page<Application> getApplications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "studentName") String sortBy
    ) {
        return applicationService.getAll(page, size, sortBy);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplication(@PathVariable Long id) {
        return applicationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Application createApplication(@RequestBody Application application) {
        return applicationService.save(application);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(
            @PathVariable Long id, 
            @RequestBody Application application) {
        try {
            return ResponseEntity.ok(applicationService.update(id, application));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        applicationService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public List<Application> searchApplications(@RequestParam String keyword) {
        return applicationService.search(keyword);
    }

    @GetMapping("/analytics/stats")
    public Map<String, Long> getAnalytics() {
        return applicationService.getAnalytics();
    }
}