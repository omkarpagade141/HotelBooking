package com.HotelBooking.HotelBooking.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "expense_master")
public class Expense {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "expens_id")
	private long expensId;
	
	@Column(name = "amount")
	private double expAmount;
	
	@Column(name = "expense_type")
	private String expType;
	
	@Column(name = "date")
	private LocalDate expDate;
	
	@Column(name = "note")
	private String expNote;
	
	@Column(name = "image_path")
	private String expImagePath;
	
	public Expense()
	{
		
	}

	public Expense(long expensId, double expAmount, String expType, LocalDate expDate, String expNote,
			String expImagePath) {
		super();
		this.expensId = expensId;
		this.expAmount = expAmount;
		this.expType = expType;
		this.expDate = expDate;
		this.expNote = expNote;
		this.expImagePath = expImagePath;
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

	public String getExpImagePath() {
		return expImagePath;
	}

	public void setExpImagePath(String expImagePath) {
		this.expImagePath = expImagePath;
	}

	@Override
	public String toString() {
		return "Expense [expensId=" + expensId + ", expAmount=" + expAmount + ", expType=" + expType + ", expDate="
				+ expDate + ", expNote=" + expNote + ", expImagePath=" + expImagePath + "]";
	}
	
	
	
}
