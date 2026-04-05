package com.bookease.service;

import com.bookease.dto.AuthRequest;
import com.bookease.dto.AuthResponse;
import com.bookease.dto.RegisterRequest;
import com.bookease.model.User;
import com.bookease.repository.UserRepository;
import com.bookease.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String register(RegisterRequest request) {
        System.out.println("Register request received");
        System.out.println("Name: " + request.getName());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Role: " + request.getRole());
        System.out.println("Stall Name: " + request.getStallName());

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        if (request.getRole() == null) {
            throw new RuntimeException("Role is required");
        }

        if (request.getRole().name().equals("BOOKSTALL")
                && (request.getStallName() == null || request.getStallName().isBlank())) {
            throw new RuntimeException("Stall name is required for bookstall");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .location(request.getLocation())
                .stallName(request.getRole().name().equals("BOOKSTALL") ? request.getStallName() : null)
                .role(request.getRole())
                .build();

        userRepository.save(user);
        return "Registration successful";
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(
                token,
                user.getRole().name(),
                user.getEmail(),
                user.getId()
        );
    }
}