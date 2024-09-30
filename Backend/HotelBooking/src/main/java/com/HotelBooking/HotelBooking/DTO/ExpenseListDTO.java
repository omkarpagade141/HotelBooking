package com.HotelBooking.HotelBooking.DTO;

import java.time.LocalDate;

public class ExpenseListDTO {

	private long expensId;
	private double expAmount;
	private String expType;
	private LocalDate expDate;
	private String expNote;
	
	public ExpenseListDTO() {
		// TODO Auto-generated constructor stub
	}

	public ExpenseListDTO(long expensId, double expAmount, String expType, LocalDate expDate, String expNote) {
		super();
		this.expensId = expensId;
		this.expAmount = expAmount;
		this.expType = expType;
		this.expDate = expDate;
		this.expNote = expNote;
	}

	public long getExpensId() {
		return expensId;
	}

	public void setExpensId(long expensId) {
		this.expensId = expensId;
	}

	public double getExpAmount() {
		return expAmount;
	}

	public void setExpAmount(double expAmount) {
		this.expAmount = expAmount;
	}

	public String getExpType() {
		return expType;
	}

	public void setExpType(String expType) {
		this.expType = expType;
	}

	public LocalDate getExpDate() {
		return expDate;
	}

	public void setExpDate(LocalDate expDate) {
		this.expDate = expDate;
	}

	public String getExpNote() {
		return expNote;
	}

	public void setExpNote(String expNote) {
		this.expNote = expNote;
	}
	
	
	
}
