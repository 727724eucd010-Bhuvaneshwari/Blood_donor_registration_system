package com.blooddonor.blooddonorsystem.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.blooddonor.blooddonorsystem.model.EligibilityScreening;
import com.blooddonor.blooddonorsystem.repository.EligibilityScreeningRepository;

@Service
public class EligibilityService {
    @Autowired private EligibilityScreeningRepository screeningRepository;

    public EligibilityScreening checkEligibility(EligibilityScreening screening) {
        String reason = null;
        if (screening.getAge() == null || screening.getAge() < 18 || screening.getAge() > 65) {
            reason = "The screening age range is 18–65 years.";
        } else if (screening.getWeightKg() == null || screening.getWeightKg() < 50) {
            reason = "The pre-screening minimum weight is 50 kg.";
        } else if (screening.getLastDonationDate() != null &&
                ChronoUnit.DAYS.between(screening.getLastDonationDate(), LocalDate.now()) < 56) {
            reason = "At least 56 days should have passed since the last whole-blood donation for this demo pre-screen.";
        } else if (screening.isRecentIllness()) {
            reason = "Recent illness or fever should be reviewed before donation.";
        } else if (screening.isRecentTattooOrSurgery()) {
            reason = "Recent tattoo, piercing or surgery may require a deferral period.";
        } else if (screening.isOnMedication()) {
            reason = "Medication use should be reviewed by the donation centre's medical team.";
        } else if (screening.isPregnancyOrBreastfeeding()) {
            reason = "Pregnancy or breastfeeding requires medical guidance before donation.";
        } else if (screening.isRecentTravel()) {
            reason = "Recent travel can require additional screening depending on destination.";
        }

        if (reason == null) {
            screening.setResult("Eligible for pre-screening");
            screening.setReason("No demo deferral rule was triggered. Final eligibility is decided by the donation centre.");
        } else {
            screening.setResult("Needs medical review");
            screening.setReason(reason);
        }
        return screeningRepository.save(screening);
    }
}
