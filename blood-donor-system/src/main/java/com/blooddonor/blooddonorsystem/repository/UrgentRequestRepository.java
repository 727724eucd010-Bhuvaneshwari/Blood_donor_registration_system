package com.blooddonor.blooddonorsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blooddonor.blooddonorsystem.model.UrgentRequest;

import java.util.List;

@Repository
public interface UrgentRequestRepository extends JpaRepository<UrgentRequest, Long> {

    List<UrgentRequest> findByStatus(String status);

}