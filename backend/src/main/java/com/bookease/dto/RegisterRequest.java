package com.bookease.dto;

import com.bookease.model.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String phone;
    private String location;
    private String stallName; // For bookstall owners
    private Role role;
}