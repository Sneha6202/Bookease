package com.bookease.repository;

import com.bookease.model.Reservation;
import com.bookease.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByCustomer(User customer);
    List<Reservation> findByBook_Stall(User stall);
}