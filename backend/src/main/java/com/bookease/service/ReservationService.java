package com.bookease.service;

import com.bookease.dto.ReservationRequest;
import com.bookease.model.Book;
import com.bookease.model.Reservation;
import com.bookease.model.ReservationStatus;
import com.bookease.model.User;
import com.bookease.repository.BookRepository;
import com.bookease.repository.ReservationRepository;
import com.bookease.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final EmailService emailService;

    // ===================== RESERVE =====================
    public Reservation reserveBook(ReservationRequest request) {

        System.out.println("reserveBook method called");

        User customer = userRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getStockQuantity() < request.getQuantity()) {
            throw new RuntimeException("Not enough stock");
        }

        if (request.getPickupDate() == null || request.getPickupDate().isBlank()) {
            throw new RuntimeException("Pickup date is required");
        }

        LocalDate pickupDate = LocalDate.parse(request.getPickupDate());

        if (pickupDate.isBefore(LocalDate.now())) {
            throw new RuntimeException("Pickup date cannot be in the past");
        }

        // Reduce stock
        book.setStockQuantity(book.getStockQuantity() - request.getQuantity());
        bookRepository.save(book);

        // Save reservation
        Reservation reservation = Reservation.builder()
                .customer(customer)
                .book(book)
                .quantity(request.getQuantity())
                .status(ReservationStatus.RESERVED)
                .reservationDate(LocalDateTime.now())
                .pickupDate(pickupDate)
                .build();

        Reservation savedReservation = reservationRepository.save(reservation);

        // ================= CUSTOMER EMAIL =================
        String subject = "BookEase - Reservation Confirmed";
        String body = "Hello " + customer.getName() + ",\n\n"
                + "Your reservation is confirmed successfully.\n\n"
                + "Book Details:\n"
                + "Title: " + book.getTitle() + "\n"
                + "Author: " + book.getAuthor() + "\n"
                + "Pickup Date: " + pickupDate + "\n"
                + "Quantity: " + request.getQuantity() + "\n\n"
                + "Please collect the book on time.\n\n"
                + "Thank you for using BookEase.\n"
                + "BookEase Team";

        boolean emailSent = emailService.sendEmail(customer.getEmail(), subject, body);
        System.out.println("Customer email status: " + emailSent);

        // ================= STALL EMAIL =================
        if (book.getStall() != null && book.getStall().getEmail() != null) {

            String stallSubject = "BookEase - New Reservation Received";

            String stallBody = "Hello " + book.getStall().getName() + ",\n\n"
                    + "A new reservation has been placed for your book.\n\n"
                    + "Book Title: " + book.getTitle() + "\n"
                    + "Customer Name: " + customer.getName() + "\n"
                    + "Customer Email: " + customer.getEmail() + "\n"
                    + "Pickup Date: " + pickupDate + "\n"
                    + "Quantity: " + request.getQuantity() + "\n\n"
                    + "Please keep the book ready.\n\n"
                    + "Thank you,\n"
                    + "BookEase Team";

            boolean stallEmailSent = emailService.sendEmail(
                    book.getStall().getEmail(),
                    stallSubject,
                    stallBody
            );

            System.out.println("Stall email status: " + stallEmailSent);
        }

        return savedReservation;
    }

    // ===================== GET CUSTOMER RESERVATIONS =====================
    public List<Reservation> getCustomerReservations(Long customerId) {
        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return reservationRepository.findByCustomer(customer);
    }

    // ===================== GET STALL RESERVATIONS =====================
    public List<Reservation> getStallReservations(Long stallId) {
        User stall = userRepository.findById(stallId)
                .orElseThrow(() -> new RuntimeException("Book stall not found"));

        return reservationRepository.findByBook_Stall(stall);
    }

    // ===================== CANCEL =====================
    public Reservation cancelReservation(Long id) {

        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (reservation.getStatus() == ReservationStatus.CANCELLED) {
            return reservation;
        }

        Book book = reservation.getBook();

        // Restore stock
        book.setStockQuantity(book.getStockQuantity() + reservation.getQuantity());
        bookRepository.save(book);

        reservation.setStatus(ReservationStatus.CANCELLED);
        Reservation updated = reservationRepository.save(reservation);

        // Customer email
        String subject = "BookEase - Reservation Cancelled";
        String body = "Hello " + reservation.getCustomer().getName() + ",\n\n"
                + "Your reservation has been cancelled successfully.\n\n"
                + "Book Details:\n"
                + "Title: " + reservation.getBook().getTitle() + "\n"
                + "Author: " + reservation.getBook().getAuthor() + "\n"
                + "Pickup Date: " + reservation.getPickupDate() + "\n\n"
                + "If this was not intended, please contact the book stall.\n\n"
                + "Thank you for using BookEase.\n"
                + "BookEase Team";

        boolean emailSent = emailService.sendEmail(
                reservation.getCustomer().getEmail(),
                subject,
                body
        );

        System.out.println("Cancel email status: " + emailSent);

        return updated;
    }

    // ===================== COMPLETE =====================
    public Reservation completeReservation(Long id) {

        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        reservation.setStatus(ReservationStatus.COMPLETED);
        Reservation updated = reservationRepository.save(reservation);

        // Customer email
        String subject = "BookEase - Reservation Completed";
        String body = "Hello " + reservation.getCustomer().getName() + ",\n\n"
                + "Your reservation has been marked as completed.\n\n"
                + "Book Details:\n"
                + "Title: " + reservation.getBook().getTitle() + "\n"
                + "Author: " + reservation.getBook().getAuthor() + "\n"
                + "Pickup Date: " + reservation.getPickupDate() + "\n\n"
                + "We hope you had a great experience.\n\n"
                + "Thank you for using BookEase.\n"
                + "BookEase Team";

        boolean emailSent = emailService.sendEmail(
                reservation.getCustomer().getEmail(),
                subject,
                body
        );

        System.out.println("Complete email status: " + emailSent);

        return updated;
    }
}