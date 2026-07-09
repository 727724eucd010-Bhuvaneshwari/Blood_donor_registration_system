package com.blooddonor.blooddonorsystem.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonor.blooddonorsystem.model.Donor;
import com.blooddonor.blooddonorsystem.service.DonorService;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class DonorController {
    private final DonorService donorService;

    public DonorController(DonorService donorService) {
        this.donorService = donorService;
    }
    
    @GetMapping("/test")
    public List<Donor> getAllUsers() {
        return donorService.getAllDonors();
    }

}
