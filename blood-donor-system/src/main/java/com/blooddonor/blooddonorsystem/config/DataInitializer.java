package com.blooddonor.blooddonorsystem.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Value;

import com.blooddonor.blooddonorsystem.model.BloodBank;
import com.blooddonor.blooddonorsystem.model.Donor;
import com.blooddonor.blooddonorsystem.model.User;
import com.blooddonor.blooddonorsystem.repository.BloodBankRepository;
import com.blooddonor.blooddonorsystem.repository.DonorRepository;
import com.blooddonor.blooddonorsystem.repository.UserRepository;

@Configuration
public class DataInitializer {
    @Value("${app.admin.email:admin@bloodconnect.gov.in}") private String adminEmail;
    @Value("${app.admin.password:Admin@123}") private String adminPassword;

    @Bean
    CommandLineRunner seedDemoData(DonorRepository donors, BloodBankRepository centers,
                                   UserRepository users, PasswordEncoder encoder) {
        return args -> {
            // Public/demo donor records. Existing records are preserved.
            ensureDonor(donors, "Arun Kumar", "O+", "Coimbatore", "arun.kumar@demo.local");
            ensureDonor(donors, "Meena S", "A+", "Coimbatore", "meena.s@demo.local");
            ensureDonor(donors, "Rahul P", "B+", "Chennai", "rahul.p@demo.local");
            ensureDonor(donors, "Kavya R", "O-", "Chennai", "kavya.r@demo.local");
            ensureDonor(donors, "Vignesh K", "AB+", "Madurai", "vignesh.k@demo.local");
            ensureDonor(donors, "Nandhini M", "A-", "Salem", "nandhini.m@demo.local");
            ensureDonor(donors, "Sathish R", "B-", "Erode", "sathish.r@demo.local");
            ensureDonor(donors, "Priya K", "O-", "Erode", "priya.k@demo.local");
            ensureDonor(donors, "Karthik S", "B+", "Coimbatore", "karthik.s@demo.local");

            // Government-style directory data. Existing records are preserved.
            ensureCenter(centers, "Government Blood Bank", "Coimbatore", "641018", "0422-4001000", "08:00 - 20:00", true);
            ensureCenter(centers, "KMCH Blood Centre", "Coimbatore", "641014", "0422-4323800", "24/7", true);
            ensureCenter(centers, "PSG Hospitals Blood Centre", "Coimbatore", "641004", "0422-4345353", "09:00 - 18:00", true);
            ensureCenter(centers, "Ganga Hospital Blood Centre", "Coimbatore", "641009", "0422-4250000", "09:00 - 17:00", true);
            ensureCenter(centers, "Government Blood Bank", "Chennai", "600010", "044-4002000", "08:00 - 20:00", true);
            ensureCenter(centers, "Rajiv Gandhi Government General Hospital Blood Centre", "Chennai", "600003", "044-25305000", "24/7", true);
            ensureCenter(centers, "Government Blood Bank", "Erode", "638011", "0424-2256000", "08:00 - 18:00", true);
            ensureCenter(centers, "LifeLine Blood Centre", "Madurai", "625020", "0452-4003000", "09:00 - 21:00", true);
            ensureCenter(centers, "Government Blood Bank", "Salem", "636001", "0427-2215000", "08:00 - 20:00", true);

            // Separate administrator account. Public registration can never create ADMIN users.
            if (users.findByEmail(adminEmail) == null) {
                User admin = new User();
                admin.setFullName("BloodConnect Administrator");
                admin.setEmail(adminEmail);
                admin.setPhoneNumber("0000000000");
                admin.setPasswordHash(encoder.encode(adminPassword));
                admin.setRole("ADMIN");
                admin.setActive(true);
                users.save(admin);
            }
        };
    }

    private void ensureDonor(DonorRepository repo, String name, String group, String city, String email) {
        if (repo.findByEmail(email) == null) {
            Donor donor = new Donor(email, name);
            donor.setBloodGroup(group);
            donor.setCity(city);
            repo.save(donor);
        }
    }

    private void ensureCenter(BloodBankRepository repo, String name, String city, String pincode,
                              String phone, String hours, boolean verified) {
        if (repo.findByNameAndCity(name, city) == null) {
            BloodBank b = new BloodBank();
            b.setName(name);
            b.setCity(city);
            b.setPincode(pincode);
            b.setContactNumber(phone);
            b.setOperatingHours(hours);
            b.setVerified(verified);
            repo.save(b);
        }
    }
}
