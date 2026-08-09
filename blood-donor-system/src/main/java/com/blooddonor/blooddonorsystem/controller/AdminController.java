package com.blooddonor.blooddonorsystem.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.blooddonor.blooddonorsystem.model.BloodBank;
import com.blooddonor.blooddonorsystem.model.Feedback;
import com.blooddonor.blooddonorsystem.model.UrgentRequest;
import com.blooddonor.blooddonorsystem.repository.FeedbackRepository;
import com.blooddonor.blooddonorsystem.repository.UrgentRequestRepository;
import com.blooddonor.blooddonorsystem.service.BloodBankService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final BloodBankService bloodBankService;
    private final UrgentRequestRepository requestRepository;
    private final FeedbackRepository feedbackRepository;

    public AdminController(BloodBankService bloodBankService, UrgentRequestRepository requestRepository,
                           FeedbackRepository feedbackRepository) {
        this.bloodBankService = bloodBankService;
        this.requestRepository = requestRepository;
        this.feedbackRepository = feedbackRepository;
    }

    @GetMapping("/centers")
    public List<BloodBank> centers() { return bloodBankService.getAllCenters(); }
    @PostMapping("/centers")
    public BloodBank createCenter(@RequestBody BloodBank bank) { return bloodBankService.create(bank); }
    @PutMapping("/centers/{id}/verification")
    public BloodBank verify(@PathVariable Long id, @RequestParam boolean verified) { return bloodBankService.setVerification(id, verified); }
    @GetMapping("/requests")
    public List<UrgentRequest> requests() { return requestRepository.findAll(); }
    @GetMapping("/feedback")
    public List<Feedback> feedback() { return feedbackRepository.findAll(); }
}
