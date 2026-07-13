package com.blooddonor.blooddonorsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blooddonor.blooddonorsystem.model.Appointment;
import com.blooddonor.blooddonorsystem.repository.AppointmentRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment bookAppointment(Appointment appointment) {
        appointment.setStatus("booked");
        return appointmentRepository.save(appointment);
    }

    public Appointment cancelAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId).get();
        appointment.setStatus("cancelled");
        return appointmentRepository.save(appointment);
    }

    public Appointment completeAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId).get();
        appointment.setStatus("completed");
        return appointmentRepository.save(appointment);
    }

  public List<Appointment> getAppointmentsByDonor(Long donorId) {
    return appointmentRepository.findByDonor_Id(donorId);
}

public List<Appointment> getDonationHistory(Long donorId) {
    return appointmentRepository.findByDonor_IdAndStatus(donorId, "completed");
}
}