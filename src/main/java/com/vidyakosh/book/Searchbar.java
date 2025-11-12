package com.vidyakosh.book;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api")
public class Searchbar {

    private final List<String> data = List.of(
        "Apple", "Banana", "Orange", "Grapes", "Mango", "Blueberry", "Avocado"
    );

    @GetMapping("/search")
    public List<String> search(@RequestParam String q) {
        String query = q.toLowerCase();
        return data.stream()
                .filter(item -> item.toLowerCase().contains(query))
                .toList();
    }
}