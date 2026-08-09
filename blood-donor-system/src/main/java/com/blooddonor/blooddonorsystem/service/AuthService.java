package com.blooddonor.blooddonorsystem.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blooddonor.blooddonorsystem.dto.AuthResponse;
import com.blooddonor.blooddonorsystem.dto.LoginRequest;
import com.blooddonor.blooddonorsystem.dto.RegisterRequest;
import com.blooddonor.blooddonorsystem.model.User;
import com.blooddonor.blooddonorsystem.repository.UserRepository;
import com.blooddonor.blooddonorsystem.security.JwtUtil;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) {
        if (request.getEmail() == null || request.getPassword() == null ||
                request.getFullName() == null || request.getEmail().isBlank() || request.getPassword().length() < 8) {
            throw new IllegalArgumentException("Name, email and password (minimum 8 characters) are required");
        }

        User existing = userRepository.findByEmail(request.getEmail().trim().toLowerCase());
        if (existing != null)
            throw new IllegalArgumentException("Email already registered");

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole("DONOR");
        user.setActive(true);
        userRepository.save(user);

        return issue(user);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase());
        if (user == null || !user.isActive()
                || !passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        return issue(user);
    }

    private AuthResponse issue(User user) {
        return new AuthResponse(
                generateJwtToken(user),
                user.getFullName(), user.getEmail(), user.getRole());
    }

    private String generateJwtToken(User user) {
        return jwtUtil.generateToken(user.getEmail(), user.getRole(), user.getFullName());
    }
}