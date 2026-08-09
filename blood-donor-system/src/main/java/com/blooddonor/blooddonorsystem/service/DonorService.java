package com.blooddonor.blooddonorsystem.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.blooddonor.blooddonorsystem.model.Donor;
import com.blooddonor.blooddonorsystem.repository.DonorRepository;

@Service
public class DonorService {
    @Autowired
    private DonorRepository donorRepository;

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

public Page<Donor> searchDonors(
        String city,
        String bloodGroup,
        int page,
        int size,
        Long currentDonorId) {

    Pageable pageable = PageRequest.of(
            page,
            size,
            Sort.by("name").ascending()
    );

    return donorRepository.searchDonors(
            city,
            bloodGroup,
            currentDonorId,
            pageable
    );
}

    public List<String> getDistinctCities() {
        return donorRepository.findDistinctCities();
    }

    public Donor findByEmail(String email) {
        return donorRepository.findByEmail(email);
    }

    public Donor registerDonor(Donor donor) {
        if (donor.getEmail() == null || donor.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required for a donor profile.");
        }
        Donor existing = donorRepository.findByEmail(donor.getEmail().trim().toLowerCase());
        if (existing != null) {
            existing.setName(donor.getName());
            existing.setPhoneNumber(donor.getPhoneNumber());
            existing.setBloodGroup(donor.getBloodGroup());
            existing.setCity(donor.getCity());
            existing.setGender(donor.getGender());
            existing.setAge(donor.getAge());
            return donorRepository.save(existing);
        }
        donor.setEmail(donor.getEmail().trim().toLowerCase());
        return donorRepository.save(donor);
    }
}
