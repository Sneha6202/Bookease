package com.bookease.repository;

import com.bookease.model.Book;
import com.bookease.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByTitleContainingIgnoreCaseAndLocationContainingIgnoreCase(String title, String location);
    List<Book> findByStall(User stall);
}