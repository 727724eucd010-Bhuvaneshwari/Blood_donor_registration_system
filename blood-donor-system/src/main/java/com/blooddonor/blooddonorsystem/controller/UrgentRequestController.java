package com.blooddonor.blooddonorsystem.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.blooddonor.blooddonorsystem.model.Donor;
import com.blooddonor.blooddonorsystem.model.UrgentRequest;
import com.blooddonor.blooddonorsystem.service.UrgentRequestService;

@RestController
@RequestMapping("/api/urgent-requests")
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class UrgentRequestController {
    @Autowired private UrgentRequestService urgentRequestService;

    @PostMapping
    public UrgentRequest createRequest(@RequestBody UrgentRequest request) { return urgentRequestService.createRequest(request); }

    // Emergency requests are operational/admin data and are intentionally not public.
    @GetMapping
    public List<UrgentRequest> getActiveRequests() { return urgentRequestService.getActiveRequests(); }

    @GetMapping("/{id}/matches")
    public List<Donor> getMatchingDonors(@PathVariable Long id) { return urgentRequestService.findMatchingDonors(id); }
}
