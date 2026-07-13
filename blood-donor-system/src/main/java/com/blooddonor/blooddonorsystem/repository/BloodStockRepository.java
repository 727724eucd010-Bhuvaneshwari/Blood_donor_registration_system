package com.blooddonor.blooddonorsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blooddonor.blooddonorsystem.model.BloodStockStatus;

public interface BloodStockRepository extends JpaRepository<BloodStockStatus, Long> {

    List<BloodStockStatus> findByRegion(String region);
}