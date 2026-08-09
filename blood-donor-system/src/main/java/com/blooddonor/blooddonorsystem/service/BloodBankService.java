package com.blooddonor.blooddonorsystem.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.blooddonor.blooddonorsystem.model.BloodBank;
import com.blooddonor.blooddonorsystem.repository.BloodBankRepository;

@Service
public class BloodBankService {
    private final BloodBankRepository bloodBankRepository;
    public BloodBankService(BloodBankRepository bloodBankRepository) { this.bloodBankRepository = bloodBankRepository; }

    public List<BloodBank> getAllCenters() { return bloodBankRepository.findAll(); }
    public List<BloodBank> searchByCity(String city) { return bloodBankRepository.findByCityContainingIgnoreCase(city); }
    public BloodBank create(BloodBank bank) { return bloodBankRepository.save(bank); }

    public BloodBank setVerification(Long id, boolean verified) {
        BloodBank bank = bloodBankRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Blood center not found"));
        bank.setVerified(verified);
        return bloodBankRepository.save(bank);
    }
}
