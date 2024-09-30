package com.HotelBooking.HotelBooking.DTO;

import java.time.LocalDate;

public class ExpenseDTO {

	private double expAmount;
	
	private LocalDate expDate;
	
	public ExpenseDTO() {
		// TODO Auto-generated constructor stub
	}

	public ExpenseDTO(double expAmount, LocalDate expDate) {
		super();
		this.expAmount = expAmount;
		this.expDate = expDate;
	}

	public double getExpAmount() {
		return expAmount;
	}

	public void setExpAmount(double expAmount) {
		this.expAmount = expAmount;
	}

	public LocalDate getExpDate() {
		return expDate;
	}

	public void setExpDate(LocalDate expDate) {
		this.expDate = expDate;
	}
	
	
}
