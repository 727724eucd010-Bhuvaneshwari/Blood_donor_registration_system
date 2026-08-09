package com.blooddonor.blooddonorsystem.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blooddonor.blooddonorsystem.model.Donor;
import com.blooddonor.blooddonorsystem.model.UrgentRequest;
import com.blooddonor.blooddonorsystem.repository.DonorRepository;
import com.blooddonor.blooddonorsystem.repository.UrgentRequestRepository;
import com.blooddonor.blooddonorsystem.util.BloodCompatibility;

@Service
public class UrgentRequestService {

    @Autowired
    private UrgentRequestRepository urgentRequestRepository;

    @Autowired
    private DonorRepository donorRepository;

   
    public UrgentRequest createRequest(UrgentRequest request) {
        return urgentRequestRepository.save(request);
    }

    public List<UrgentRequest> getActiveRequests() {
        return urgentRequestRepository.findByStatus("active");
    }

    public List<Donor> findMatchingDonors(Long requestId) {

        UrgentRequest request = urgentRequestRepository.findById(requestId).orElse(null);

        List<Donor> matchingDonors = new ArrayList<>();

        if (request == null) {
            return matchingDonors; 
        }

      
        List<String> compatibleGroups = BloodCompatibility.getCompatibleDonorGroups(request.getBloodGroup());

     
        List<Donor> donorsInCity = donorRepository.findByCity(request.getCity());

        // Step 3: check each donor manually (beginner-friendly loop)
        LocalDate today = LocalDate.now();

        for (Donor donor : donorsInCity) {

            boolean groupMatches = compatibleGroups.contains(donor.getBloodGroup());

            boolean isEligible = (donor.getNextEligibleDate() == null)
                    || (!donor.getNextEligibleDate().isAfter(today));

            if (groupMatches && isEligible) {
                matchingDonors.add(donor);
            }
        }

        return matchingDonors;
    }
}