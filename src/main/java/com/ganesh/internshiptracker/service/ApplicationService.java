package com.ganesh.internshiptracker.service;

import com.ganesh.internshiptracker.model.Application;
import com.ganesh.internshiptracker.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository repository;

    public Application save(Application application) {
        return repository.save(application);
    }

    public Optional<Application> findById(Long id) {
        return repository.findById(id);
    }

    public Application update(Long id, Application application) {
        Application existing = repository.findById(id).orElseThrow(() -> 
            new RuntimeException("Application not found"));
        existing.setStudentName(application.getStudentName());
        existing.setCompany(application.getCompany());
        existing.setRole(application.getRole());
        existing.setStatus(application.getStatus());
        return repository.save(existing);
    }

    public Page<Application> getAll(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return repository.findAll(pageable);
    }

    public List<Application> search(String keyword) {
        List<Application> all = repository.findAll();
        return all.stream()
                .filter(a -> a.getStudentName().toLowerCase().contains(keyword.toLowerCase()) ||
                            a.getCompany().toLowerCase().contains(keyword.toLowerCase()) ||
                            a.getRole().toLowerCase().contains(keyword.toLowerCase()))
                .toList();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Map<String, Long> getAnalytics() {
        List<Application> all = repository.findAll();
        Map<String, Long> stats = new LinkedHashMap<>();
        stats.put("total", (long) all.size());
        stats.put("applied", all.stream().filter(a -> a.getStatus().equalsIgnoreCase("Applied")).count());
        stats.put("interview", all.stream().filter(a -> a.getStatus().equalsIgnoreCase("Interview")).count());
        stats.put("selected", all.stream().filter(a -> a.getStatus().equalsIgnoreCase("Selected")).count());
        stats.put("rejected", all.stream().filter(a -> a.getStatus().equalsIgnoreCase("Rejected")).count());
        return stats;
    }
}