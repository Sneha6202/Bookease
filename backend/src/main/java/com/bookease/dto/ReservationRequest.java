package com.bookease.dto;

import lombok.Data;

@Data
public class ReservationRequest {
    private Long customerId;
    private Long bookId;
    private Integer quantity;
    private String pickupDate;
}