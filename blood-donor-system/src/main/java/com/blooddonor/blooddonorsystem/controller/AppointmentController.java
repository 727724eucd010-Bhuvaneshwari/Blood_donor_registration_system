package com.blooddonor.blooddonorsystem.controller;

import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.blooddonor.blooddonorsystem.model.Appointment;
import com.blooddonor.blooddonorsystem.model.Donor;
import com.blooddonor.blooddonorsystem.service.AppointmentService;
import com.blooddonor.blooddonorsystem.service.DonorService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private DonorService donorService;


    @PostMapping("/book")
    public Appointment book(@RequestBody Appointment appointment) {
        return appointmentService.bookAppointment(appointment);
    }


    @PutMapping("/{id}/cancel")
    public Appointment cancel(@PathVariable Long id) {
        return appointmentService.cancelAppointment(id);
    }


    @PutMapping("/{id}/complete")
    public Appointment complete(@PathVariable Long id) {
        return appointmentService.completeAppointment(id);
    }


    // ==============================
    // ADMIN - ALL APPOINTMENTS
    // ==============================

    @GetMapping("/admin/all")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }


    // ==============================
    // DONOR - MY APPOINTMENTS
    // ==============================

    @GetMapping("/my")
    public List<Appointment> getMyAppointments(Principal principal) {

        Donor donor =
            donorService.findByEmail(principal.getName());

        if (donor == null) {
            throw new IllegalArgumentException(
                "No donor profile is linked to this account. Please register as a donor first."
            );
        }

        return appointmentService.getAppointmentsByDonor(
            donor.getId()
        );
    }


    @GetMapping("/my/history")
    public List<Appointment> getMyHistory(Principal principal) {

        Donor donor =
            donorService.findByEmail(principal.getName());

        if (donor == null) {
            throw new IllegalArgumentException(
                "No donor profile is linked to this account. Please register as a donor first."
            );
        }

        return appointmentService.getDonationHistory(
            donor.getId()
        );
    }


    @GetMapping("/donor/{donorId}")
    public List<Appointment> getByDonor(
        @PathVariable Long donorId
    ) {
        return appointmentService.getAppointmentsByDonor(
            donorId
        );
    }


    @GetMapping("/donor/{donorId}/history")
    public List<Appointment> getHistory(
        @PathVariable Long donorId
    ) {
        return appointmentService.getDonationHistory(
            donorId
        );
    }
}