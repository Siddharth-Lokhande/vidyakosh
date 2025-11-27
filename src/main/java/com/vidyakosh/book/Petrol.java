package com.vidyakosh.book;

import org.springframework.stereotype.Component;

@Component
class Petrol implements Engine{
	@Override
	public void fuel() {
		System.out.println("Petrol engine started");
	}
}