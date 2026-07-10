package com.blooddonor.blooddonorsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blooddonor.blooddonorsystem.model.EligibilityScreening;
import com.blooddonor.blooddonorsystem.repository.EligibilityScreeningRepository;

@Service
public class EligibilityService {

    @Autowired
    private EligibilityScreeningRepository screeningRepository;

    public EligibilityScreening checkEligibility(EligibilityScreening screening) {

        // Simple rule: if any answer is true, donor may not be eligible
        if (screening.isRecentTravel() || screening.isRecentIllness()
                || screening.isOnMedication() || screening.isRecentTattooOrSurgery()) {

            screening.setResult("Not Eligible - Please consult a doctor");
        } else {
            screening.setResult("Eligible to Donate");
        }

        return screeningRepository.save(screening);
    }
}