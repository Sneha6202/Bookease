package com.bookease.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String category;
    private Double price;
    private String publication;
    private String location;
    private Integer stockQuantity;
    private String description;

    @ManyToOne
    @JoinColumn(name = "stall_id")
    private User stall;
}