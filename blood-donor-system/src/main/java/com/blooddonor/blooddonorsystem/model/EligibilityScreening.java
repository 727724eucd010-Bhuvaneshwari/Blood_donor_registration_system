package com.blooddonor.blooddonorsystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "eligibility_screenings")
public class EligibilityScreening {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long screeningId;

    @ManyToOne
    @JoinColumn(name = "donor_id")
    private Donor donor;

    private boolean recentTravel;
    private boolean recentIllness;
    private boolean onMedication;
    private boolean recentTattooOrSurgery;

    private String result;

    // Getters and Setters

    public Long getScreeningId() {
        return screeningId;
    }

    public void setScreeningId(Long screeningId) {
        this.screeningId = screeningId;
    }

    public Donor getDonor() {
        return donor;
    }

    public void setDonor(Donor donor) {
        this.donor = donor;
    }

    public boolean isRecentTravel() {
        return recentTravel;
    }

    public void setRecentTravel(boolean recentTravel) {
        this.recentTravel = recentTravel;
    }

    public boolean isRecentIllness() {
        return recentIllness;
    }

    public void setRecentIllness(boolean recentIllness) {
        this.recentIllness = recentIllness;
    }

    public boolean isOnMedication() {
        return onMedication;
    }

    public void setOnMedication(boolean onMedication) {
        this.onMedication = onMedication;
    }

    public boolean isRecentTattooOrSurgery() {
        return recentTattooOrSurgery;
    }

    public void setRecentTattooOrSurgery(boolean recentTattooOrSurgery) {
        this.recentTattooOrSurgery = recentTattooOrSurgery;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}