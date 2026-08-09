package com.blooddonor.blooddonorsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blooddonor.blooddonorsystem.model.EligibilityScreening;


public interface EligibilityScreeningRepository extends JpaRepository<EligibilityScreening, Long> {
}