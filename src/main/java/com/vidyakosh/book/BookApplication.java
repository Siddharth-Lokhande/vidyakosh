package com.vidyakosh.book;
import java.util.Scanner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookApplication.class, args);
		Scanner sc=new Scanner(System.in);
		System.out.println("Enter the type of engine you want: ");
		int num=(sc.nextInt());
		if (num==1) {
		Car car = new Car(new Electric());
		car.display();
		}
		else {
			Car car = new Car(new Petrol());
			car.display();
			}
	}
}
