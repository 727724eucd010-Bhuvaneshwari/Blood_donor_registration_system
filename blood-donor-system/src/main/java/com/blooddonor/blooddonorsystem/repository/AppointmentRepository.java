package com.blooddonor.blooddonorsystem.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.blooddonor.blooddonorsystem.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDonor_Id(Long donorId);
    List<Appointment> findByDonor_IdAndStatus(Long donorId, String status);
    boolean existsByDonor_IdAndAppointmentDateAndStatusNot(Long donorId, LocalDate appointmentDate, String status);
}
