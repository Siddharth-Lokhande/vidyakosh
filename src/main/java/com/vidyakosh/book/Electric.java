package com.vidyakosh.book;

import org.springframework.stereotype.Component;

@Component
class Electric implements Engine{
	@Override
	public void fuel() {
		System.out.println("Electric engine started");
	}
}