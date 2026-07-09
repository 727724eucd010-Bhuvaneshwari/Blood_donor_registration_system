package com.blooddonor.blooddonorsystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UrgentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    private String bloodGroup;
    private int quantityRequired;
    private String requestingFacility;
    private String city;
    private String status = "active";

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public int getQuantityRequired() {
        return quantityRequired;
    }

    public void setQuantityRequired(int quantityRequired) {
        this.quantityRequired = quantityRequired;
    }

    public String getRequestingFacility() {
        return requestingFacility;
    }

    public void setRequestingFacility(String requestingFacility) {
        this.requestingFacility = requestingFacility;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}