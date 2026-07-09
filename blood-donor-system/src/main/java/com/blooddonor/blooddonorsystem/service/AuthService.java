package com.blooddonor.blooddonorsystem.service;

import com.blooddonor.blooddonorsystem.dto.LoginRequest;
import com.blooddonor.blooddonorsystem.dto.RegisterRequest;
import com.blooddonor.blooddonorsystem.model.User;
import com.blooddonor.blooddonorsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Register a new user
    public String register(RegisterRequest request) {

        User existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser != null) {
            return "Email already registered";
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole("DONOR");

        userRepository.save(user);

        return "Registration successful";
    }

    // Login an existing user
    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) {
            return "User not found";
        }

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPasswordHash());

        if (!passwordMatches) {
            return "Incorrect password";
        }

        return "Login successful";
    }
}