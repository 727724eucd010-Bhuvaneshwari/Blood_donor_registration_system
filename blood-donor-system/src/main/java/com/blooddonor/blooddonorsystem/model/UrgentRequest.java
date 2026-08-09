package com.blooddonor.blooddonorsystem.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
public class UrgentRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;
    private String patientName;
    private String bloodGroup;
    private int quantityRequired;
    private String requestingFacility;
    private String city;
    private String contactNumber;
    private String urgency = "HIGH";
    private String status = "active";
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getRequestId(){return requestId;} public void setRequestId(Long v){requestId=v;}
    public String getPatientName(){return patientName;} public void setPatientName(String v){patientName=v;}
    public String getBloodGroup(){return bloodGroup;} public void setBloodGroup(String v){bloodGroup=v;}
    public int getQuantityRequired(){return quantityRequired;} public void setQuantityRequired(int v){quantityRequired=v;}
    public String getRequestingFacility(){return requestingFacility;} public void setRequestingFacility(String v){requestingFacility=v;}
    public String getCity(){return city;} public void setCity(String v){city=v;}
    public String getContactNumber(){return contactNumber;} public void setContactNumber(String v){contactNumber=v;}
    public String getUrgency(){return urgency;} public void setUrgency(String v){urgency=v;}
    public String getStatus(){return status;} public void setStatus(String v){status=v;}
    public LocalDateTime getCreatedAt(){return createdAt;} public void setCreatedAt(LocalDateTime v){createdAt=v;}
}
