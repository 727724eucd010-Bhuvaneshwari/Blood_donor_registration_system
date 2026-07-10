package com.blooddonor.blooddonorsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonor.blooddonorsystem.model.BloodBank;
import com.blooddonor.blooddonorsystem.service.BloodBankService;

@RestController
@RequestMapping("/api/centers")
@CrossOrigin(origins = "http://localhost:5173")
public class BloodBankController {

    @Autowired
    private BloodBankService bloodBankService;

    @GetMapping
    public List<BloodBank> getAllCenters() {
        return bloodBankService.getAllCenters();
    }

    @GetMapping("/search")
    public List<BloodBank> searchByCity(@RequestParam String city) {
        return bloodBankService.searchByCity(city);
    }
}