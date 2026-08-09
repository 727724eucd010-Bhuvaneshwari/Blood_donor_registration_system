package com.blooddonor.blooddonorsystem.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.blooddonor.blooddonorsystem.dto.AuthResponse;
import com.blooddonor.blooddonorsystem.dto.LoginRequest;
import com.blooddonor.blooddonorsystem.dto.RegisterRequest;
import com.blooddonor.blooddonorsystem.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${app.cors.allowed-origin}")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
