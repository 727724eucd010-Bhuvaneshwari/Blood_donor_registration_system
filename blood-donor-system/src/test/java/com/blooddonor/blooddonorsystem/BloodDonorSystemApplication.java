package com.blooddonor.blooddonorsystem;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.blooddonor.blooddonorsystem.model.User;
import com.blooddonor.blooddonorsystem.repository.UserRepository;

@SpringBootApplication
public class BloodDonorSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(BloodDonorSystemApplication.class, args);
    }

    @Bean
    CommandLineRunner createAdmin(UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (userRepository.findByEmail("admin@bloodconnect.gov.in") == null) {

                User admin = new User();

                admin.setFullName("BloodConnect Admin");
                admin.setEmail("admin@bloodconnect.gov.in");
                admin.setPhoneNumber("9999999999");
                admin.setPasswordHash(
                        passwordEncoder.encode("Admin@123"));
                admin.setRole("ADMIN");
                admin.setActive(true);

                userRepository.save(admin);

                System.out.println("ADMIN CREATED SUCCESSFULLY");
            }
        };
    }
}