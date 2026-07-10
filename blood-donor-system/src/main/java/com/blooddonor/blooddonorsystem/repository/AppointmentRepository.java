package com.blooddonor.blooddonorsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blooddonor.blooddonorsystem.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByDonorId(Long donorId);

    List<Appointment> findByDonorIdAndStatus(Long donorId, String status);
}