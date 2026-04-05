package com.bookease.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public boolean sendEmail(String to, String subject, String body) {
        try {
            System.out.println("=================================");
            System.out.println("Inside EmailService");
            System.out.println("Sending email to: " + to);
            System.out.println("Sending from: " + fromEmail);
            System.out.println("Subject: " + subject);
            System.out.println("=================================");

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);

            System.out.println("✅ Email sent successfully");
            return true;

        } catch (Exception e) {
            System.out.println("❌ Email sending failed: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
}