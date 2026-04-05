package com.bookease.controller;

import com.bookease.model.Book;
import com.bookease.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private final BookService bookService;

    @PostMapping("/stall/{stallId}")
    public Book addBook(@PathVariable Long stallId, @RequestBody Book book) {
        return bookService.addBook(book, stallId);
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String title,
                                  @RequestParam(required = false) String location) {
        return bookService.searchBooks(title, location);
    }

    @GetMapping("/stall/{stallId}")
    public List<Book> getBooksByStall(@PathVariable Long stallId) {
        return bookService.getBooksByStall(stallId);
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        return bookService.updateBook(id, book);
    }

    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return "Book deleted successfully";
    }
}