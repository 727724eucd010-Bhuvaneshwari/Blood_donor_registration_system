package com.blooddonor.blooddonorsystem.model;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "eligibility_screenings")
public class EligibilityScreening {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long screeningId;

    @ManyToOne @JoinColumn(name = "donor_id")
    private Donor donor;

    private Integer age;
    private Double weightKg;
    private LocalDate lastDonationDate;
    private boolean recentTravel;
    private boolean recentIllness;
    private boolean onMedication;
    private boolean recentTattooOrSurgery;
    private boolean pregnancyOrBreastfeeding;
    private String result;
    private String reason;

    public Long getScreeningId(){return screeningId;} public void setScreeningId(Long v){screeningId=v;}
    public Donor getDonor(){return donor;} public void setDonor(Donor v){donor=v;}
    public Integer getAge(){return age;} public void setAge(Integer v){age=v;}
    public Double getWeightKg(){return weightKg;} public void setWeightKg(Double v){weightKg=v;}
    public LocalDate getLastDonationDate(){return lastDonationDate;} public void setLastDonationDate(LocalDate v){lastDonationDate=v;}
    public boolean isRecentTravel(){return recentTravel;} public void setRecentTravel(boolean v){recentTravel=v;}
    public boolean isRecentIllness(){return recentIllness;} public void setRecentIllness(boolean v){recentIllness=v;}
    public boolean isOnMedication(){return onMedication;} public void setOnMedication(boolean v){onMedication=v;}
    public boolean isRecentTattooOrSurgery(){return recentTattooOrSurgery;} public void setRecentTattooOrSurgery(boolean v){recentTattooOrSurgery=v;}
    public boolean isPregnancyOrBreastfeeding(){return pregnancyOrBreastfeeding;} public void setPregnancyOrBreastfeeding(boolean v){pregnancyOrBreastfeeding=v;}
    public String getResult(){return result;} public void setResult(String v){result=v;}
    public String getReason(){return reason;} public void setReason(String v){reason=v;}
}
