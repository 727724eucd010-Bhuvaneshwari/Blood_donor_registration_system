package com.blooddonor.blooddonorsystem.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.blooddonor.blooddonorsystem.model.BloodBank;

public interface BloodBankRepository extends JpaRepository<BloodBank, Long> {
    List<BloodBank> findByCity(String city);
    List<BloodBank> findByCityContainingIgnoreCase(String city);
    BloodBank findByNameAndCity(String name, String city);
}
