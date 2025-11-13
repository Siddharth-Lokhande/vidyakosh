package com.vidyakosh.book;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import java.util.Map;
import java.util.HashMap;
@RestController
public class Getbook {

    @GetMapping(value = "getbook/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> getBook(@PathVariable("id") int id) {
        // Dummy data for demonstration
        Map<String, Object> book = new HashMap<>();
        book.put("id", id);
        book.put("title", "The Catcher in the Rye");
        book.put("author", "J. D. Salinger");
        book.put("publisher", "Little, Brown and Company");
        book.put("language", "English");
        book.put("pages", 224);
        book.put("isbn", "978-0316769488");
        book.put("category", "CLASSIC LITERATURE");
        book.put("description", "The Catcher in the Rye is a novel by J. D. Salinger. Published in 1951, the novel details two days in the life of 16-year-old Holden Caulfield after he has been expelled from prep school. A classic novel about angst, alienation, and the complexities of growing up.");
        book.put("imageUrl", "https://img.freepik.com/free-vector/minimalist-book-cover-template_23-2148899519.jpg");
        book.put("rating", 3.0);
        book.put("price", 18.99);

        return ResponseEntity.ok(book);
    }
}
