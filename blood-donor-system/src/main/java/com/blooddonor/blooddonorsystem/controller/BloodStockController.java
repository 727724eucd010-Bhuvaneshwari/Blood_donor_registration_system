package com.blooddonor.blooddonorsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonor.blooddonorsystem.model.BloodStockStatus;
import com.blooddonor.blooddonorsystem.service.BloodStockService;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class BloodStockController {

    @Autowired
    private BloodStockService bloodStockService;

    @PostMapping
    public BloodStockStatus updateStock(@RequestBody BloodStockStatus stock) {
        return bloodStockService.updateStock(stock);
    }

    @GetMapping
    public List<BloodStockStatus> getAllStock() {
        return bloodStockService.getAllStock();
    }

    @GetMapping("/region")
    public List<BloodStockStatus> getByRegion(@RequestParam String region) {
        return bloodStockService.getStockByRegion(region);
    }
}