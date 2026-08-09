package com.blooddonor.blooddonorsystem.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.blooddonor.blooddonorsystem.model.Donor;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Long> {
    List<Donor> findByCity(String city);
    Donor findByEmail(String email);
@Query("SELECT d FROM Donor d WHERE "
        + "d.id <> :currentDonorId "
        + "AND (:city IS NULL OR :city = '' OR LOWER(d.city) LIKE LOWER(CONCAT('%', :city, '%'))) "
        + "AND (:bloodGroup IS NULL OR :bloodGroup = '' OR d.bloodGroup = :bloodGroup)")
Page<Donor> searchDonors(
        @Param("city") String city,
        @Param("bloodGroup") String bloodGroup,
        @Param("currentDonorId") Long currentDonorId,
        Pageable pageable);

    @Query("SELECT DISTINCT d.city FROM Donor d WHERE d.city IS NOT NULL ORDER BY d.city")
    List<String> findDistinctCities();
}
