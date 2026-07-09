package com.blooddonor.blooddonorsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blooddonor.blooddonorsystem.model.Donor;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Long> {

    List<Donor> findByCity(String city);

}