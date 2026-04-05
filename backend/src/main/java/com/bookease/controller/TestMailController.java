package com.bookease.controller;

import com.bookease.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestMailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/test-mail")
    public String testMail() {

        System.out.println("=== Test Mail API Called ===");

        boolean result = emailService.sendEmail(
                "hiddenjourney.life@gmail.com",
                "BookEase Test Mail",
                "If you received this, email is working."
        );

        if (result) {
            System.out.println("=== Email Sent Successfully ===");
            return "Mail sent successfully";
        } else {
            System.out.println("=== Email Sending Failed ===");
            return "Mail sending failed";
        }
    }
}