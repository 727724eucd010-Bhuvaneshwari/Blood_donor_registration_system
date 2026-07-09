package com.blooddonor.blooddonorsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BloodDonorSystemApplication {

	public static void main(String[] args) {

		System.out.println("Blood Donor System Application is starting...");
		SpringApplication.run(BloodDonorSystemApplication.class, args);
	}
}