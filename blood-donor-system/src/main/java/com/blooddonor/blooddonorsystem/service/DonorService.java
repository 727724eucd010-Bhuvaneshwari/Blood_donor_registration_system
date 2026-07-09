package com.blooddonor.blooddonorsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

}
