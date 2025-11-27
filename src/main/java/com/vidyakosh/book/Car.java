package com.vidyakosh.book;
import org.springframework.stereotype.Component;
@Component
public class Car{
	
	Engine engine;
	
	Car( Engine engine){
		
		this.engine=engine;
	}
	public void display() {
		engine.fuel();
	}

}