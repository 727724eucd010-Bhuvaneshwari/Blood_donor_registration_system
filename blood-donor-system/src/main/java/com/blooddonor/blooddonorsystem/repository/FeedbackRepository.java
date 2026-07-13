package com.blooddonor.blooddonorsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blooddonor.blooddonorsystem.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findByBloodBank_CenterId(Long centerId);
}