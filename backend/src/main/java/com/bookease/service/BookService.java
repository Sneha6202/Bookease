package com.bookease.service;

import com.bookease.model.Book;
import com.bookease.model.User;
import com.bookease.repository.BookRepository;
import com.bookease.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public Book addBook(Book book, Long stallId) {
        User stall = userRepository.findById(stallId)
                .orElseThrow(() -> new RuntimeException("Book stall not found"));
        book.setStall(stall);
        return bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public List<Book> searchBooks(String title, String location) {
        if ((title == null || title.isBlank()) && (location == null || location.isBlank())) {
            return bookRepository.findAll();
        }

        if (location == null || location.isBlank()) {
            return bookRepository.findByTitleContainingIgnoreCase(title);
        }

        return bookRepository.findByTitleContainingIgnoreCaseAndLocationContainingIgnoreCase(title, location);
    }

    public List<Book> getBooksByStall(Long stallId) {
        User stall = userRepository.findById(stallId)
                .orElseThrow(() -> new RuntimeException("Book stall not found"));
        return bookRepository.findByStall(stall);
    }

    public Book updateBook(Long id, Book updatedBook) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setPublication(updatedBook.getPublication());
        book.setPrice(updatedBook.getPrice());
        book.setStockQuantity(updatedBook.getStockQuantity());
        book.setLocation(updatedBook.getLocation());

        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}