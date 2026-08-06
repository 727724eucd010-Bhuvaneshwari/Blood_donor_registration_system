package com.blooddonor.blooddonorsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonor.blooddonorsystem.model.Donor;
import com.blooddonor.blooddonorsystem.model.UrgentRequest;
import com.blooddonor.blooddonorsystem.service.UrgentRequestService;

@RestController
@RequestMapping("/api/urgent-requests")
@CrossOrigin(origins = "http://  vlocalhost:5173")
public class UrgentRequestController {

    @Autowired
    private UrgentRequestService urgentRequestService;

    @PostMapping
    public UrgentRequest createRequest(@RequestBody UrgentRequest request) {
        return urgentRequestService.createRequest(request);
    }

    @GetMapping
    public List<UrgentRequest> getActiveRequests() {
        return urgentRequestService.getActiveRequests();
    }

    
    @GetMapping("/{id}/matches")
    public List<Donor> getMatchingDonors(@PathVariable Long id) {
        return urgentRequestService.findMatchingDonors(id);
    }
}