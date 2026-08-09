package com.blooddonor.blooddonorsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blooddonor.blooddonorsystem.model.EligibilityScreening;
import com.blooddonor.blooddonorsystem.service.EligibilityService;

@RestController
@RequestMapping("/api/eligibility")
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class EligibilityController {

    @Autowired
    private EligibilityService eligibilityService;

    @PostMapping("/check")
    public EligibilityScreening checkEligibility(@RequestBody EligibilityScreening screening) {
        return eligibilityService.checkEligibility(screening);
    }
}