package com.blooddonor.blooddonorsystem.controller;

import java.security.Principal;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.blooddonor.blooddonorsystem.dto.DonorSummary;
import com.blooddonor.blooddonorsystem.model.Donor;
import com.blooddonor.blooddonorsystem.service.DonorService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class DonorController {
    private final DonorService donorService;
    public DonorController(DonorService donorService) { this.donorService = donorService; }

    @GetMapping("/test")
    public List<DonorSummary> getAllUsers() {
        return donorService.getAllDonors().stream().map(this::summary).toList();
    }

  @GetMapping("/donors/search")
public Page<DonorSummary> searchDonors(
        @RequestParam(defaultValue = "") String city,
        @RequestParam(defaultValue = "") String bloodGroup,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "9") int size,
        Principal principal) {

    Donor currentDonor = donorService.findByEmail(principal.getName());

    Long currentDonorId = currentDonor != null
            ? currentDonor.getId()
            : -1L;

    return donorService.searchDonors(
            city,
            bloodGroup,
            page,
            Math.min(Math.max(size, 1), 50),
            currentDonorId
    ).map(this::summary);
}

    @GetMapping("/donors/cities")
    public List<String> getCities() { return donorService.getDistinctCities(); }

    @GetMapping("/donors/me")
    public ResponseEntity<Donor> getMyDonorProfile(Principal principal) {
        Donor donor = donorService.findByEmail(principal.getName());
        return donor == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(donor);
    }

    @PostMapping("/donors/register")
    public Donor registerDonor(@RequestBody Donor donor) { return donorService.registerDonor(donor); }

    private DonorSummary summary(Donor d) {
        return new DonorSummary(d.getId(), d.getName(), d.getBloodGroup(), d.getCity(), d.isAvailable());
    }
}
