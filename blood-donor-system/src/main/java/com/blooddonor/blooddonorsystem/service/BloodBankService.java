package com.blooddonor.blooddonorsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blooddonor.blooddonorsystem.model.BloodBank;
import com.blooddonor.blooddonorsystem.repository.BloodBankRepository;

@Service
public class BloodBankService {

    @Autowired
    private BloodBankRepository bloodBankRepository;

    public List<BloodBank> getAllCenters() {
        return bloodBankRepository.findAll();
    }

    public List<BloodBank> searchByCity(String city) {
        return bloodBankRepository.findByCity(city);
    }
}