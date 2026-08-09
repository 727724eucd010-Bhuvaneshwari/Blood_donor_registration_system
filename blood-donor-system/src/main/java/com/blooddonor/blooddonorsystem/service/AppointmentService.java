package com.blooddonor.blooddonorsystem.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.blooddonor.blooddonorsystem.model.Appointment;
import com.blooddonor.blooddonorsystem.model.BloodBank;
import com.blooddonor.blooddonorsystem.model.Donor;
import com.blooddonor.blooddonorsystem.repository.AppointmentRepository;
import com.blooddonor.blooddonorsystem.repository.BloodBankRepository;
import com.blooddonor.blooddonorsystem.repository.DonorRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private BloodBankRepository bloodBankRepository;

    public Appointment bookAppointment(Appointment appointment) {

        if (appointment.getDonor() == null ||
                appointment.getDonor().getId() == null) {

            throw new IllegalArgumentException(
                    "Please select a valid donor profile.");
        }

        if (appointment.getBloodBank() == null ||
                appointment.getBloodBank().getCenterId() == null) {

            throw new IllegalArgumentException(
                    "Please select a valid blood center.");
        }

        if (appointment.getAppointmentDate() == null) {

            throw new IllegalArgumentException(
                    "Please select an appointment date.");
        }

        if (appointment.getAppointmentDate()
                .isBefore(LocalDate.now())) {

            throw new IllegalArgumentException(
                    "Appointment date cannot be in the past.");
        }

        Donor donor = donorRepository.findById(
                appointment.getDonor().getId()).orElseThrow(
                        () -> new IllegalArgumentException(
                                "Donor profile not found."));

        BloodBank center = bloodBankRepository.findById(
                appointment.getBloodBank().getCenterId()).orElseThrow(
                        () -> new IllegalArgumentException(
                                "Blood center not found."));

        if (appointmentRepository
                .existsByDonor_IdAndAppointmentDateAndStatusNot(
                        donor.getId(),
                        appointment.getAppointmentDate(),
                        "cancelled")) {

            throw new IllegalArgumentException(
                    "You already have an appointment on this date.");
        }

        appointment.setDonor(donor);
        appointment.setBloodBank(center);
        appointment.setStatus("booked");

        return appointmentRepository.save(appointment);
    }

    public Appointment cancelAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Appointment not found"));

        appointment.setStatus("cancelled");

        return appointmentRepository.save(appointment);
    }

    public Appointment completeAppointment(Long appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Appointment not found"));

        appointment.setStatus("completed");

        return appointmentRepository.save(appointment);
    }

    // ADMIN
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAppointmentsByDonor(Long donorId) {
        return appointmentRepository.findByDonor_Id(donorId);
    }

    public List<Appointment> getDonationHistory(Long donorId) {
        return appointmentRepository
                .findByDonor_IdAndStatus(
                        donorId,
                        "completed");
    }
}