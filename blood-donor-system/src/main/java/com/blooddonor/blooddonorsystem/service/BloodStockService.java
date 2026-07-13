package com.blooddonor.blooddonorsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blooddonor.blooddonorsystem.model.BloodStockStatus;
import com.blooddonor.blooddonorsystem.repository.BloodStockRepository;

@Service
public class BloodStockService {

    @Autowired
    private BloodStockRepository bloodStockRepository;

    public BloodStockStatus updateStock(BloodStockStatus stock) {
        return bloodStockRepository.save(stock);
    }

    public List<BloodStockStatus> getStockByRegion(String region) {
        return bloodStockRepository.findByRegion(region);
    }

    public List<BloodStockStatus> getAllStock() {
        return bloodStockRepository.findAll();
    }
}