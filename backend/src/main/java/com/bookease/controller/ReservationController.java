package com.bookease.controller;
import com.bookease.dto.ReservationRequest;
import com.bookease.model.Reservation;
import com.bookease.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public Reservation reserveBook(@RequestBody ReservationRequest request) {
        return reservationService.reserveBook(request);
    }

    @GetMapping("/customer/{customerId}")
    public List<Reservation> getCustomerReservations(@PathVariable Long customerId) {
        return reservationService.getCustomerReservations(customerId);
    }

    @GetMapping("/stall/{stallId}")
    public List<Reservation> getStallReservations(@PathVariable Long stallId) {
        return reservationService.getStallReservations(stallId);
    }

    @PutMapping("/cancel/{id}")
    public Reservation cancelReservation(@PathVariable Long id) {
        return reservationService.cancelReservation(id);
    }

    @PutMapping("/complete/{id}")
    public Reservation completeReservation(@PathVariable Long id) {
        return reservationService.completeReservation(id);
    }
}