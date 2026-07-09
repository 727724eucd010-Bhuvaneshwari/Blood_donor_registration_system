package com.blooddonor.blooddonorsystem.controller;

import com.blooddonor.blooddonorsystem.model.Donor;
import com.blooddonor.blooddonorsystem.model.UrgentRequest;
import com.blooddonor.blooddonorsystem.service.UrgentRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/urgent-requests")
@CrossOrigin(origins = "http://localhost:5173")
public class UrgentRequestController {

    @Autowired
    private UrgentRequestService urgentRequestService;

    // Create a new urgent request
    @PostMapping
    public UrgentRequest createRequest(@RequestBody UrgentRequest request) {
        return urgentRequestService.createRequest(request);
    }

    // Get all active requests
    @GetMapping
    public List<UrgentRequest> getActiveRequests() {
        return urgentRequestService.getActiveRequests();
    }

    // Get matching donors for a specific request
    @GetMapping("/{id}/matches")
    public List<Donor> getMatchingDonors(@PathVariable Long id) {
        return urgentRequestService.findMatchingDonors(id);
    }
}