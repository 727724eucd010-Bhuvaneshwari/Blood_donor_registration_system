package com.blooddonor.blooddonorsystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    @ManyToOne
    @JoinColumn(name = "donor_id")
    private Donor donor;

    @ManyToOne
    @JoinColumn(name = "center_id")
    private BloodBank bloodBank;

    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    private int ratingStaff;
    private int ratingFacility;
    private int ratingWaitTime;

    private String comments;
    private boolean isAnonymous;

    // Getters and Setters

    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }

    public Donor getDonor() {
        return donor;
    }

    public void setDonor(Donor donor) {
        this.donor = donor;
    }

    public BloodBank getBloodBank() {
        return bloodBank;
    }

    public void setBloodBank(BloodBank bloodBank) {
        this.bloodBank = bloodBank;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public int getRatingStaff() {
        return ratingStaff;
    }

    public void setRatingStaff(int ratingStaff) {
        this.ratingStaff = ratingStaff;
    }

    public int getRatingFacility() {
        return ratingFacility;
    }

    public void setRatingFacility(int ratingFacility) {
        this.ratingFacility = ratingFacility;
    }

    public int getRatingWaitTime() {
        return ratingWaitTime;
    }

    public void setRatingWaitTime(int ratingWaitTime) {
        this.ratingWaitTime = ratingWaitTime;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public boolean isAnonymous() {
        return isAnonymous;
    }

    public void setAnonymous(boolean anonymous) {
        isAnonymous = anonymous;
    }
}