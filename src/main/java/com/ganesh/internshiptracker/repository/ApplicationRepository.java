package com.ganesh.internshiptracker.repository;

import com.ganesh.internshiptracker.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
}