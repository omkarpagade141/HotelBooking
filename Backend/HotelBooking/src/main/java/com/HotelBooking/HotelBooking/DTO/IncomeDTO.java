package com.HotelBooking.HotelBooking.DTO;

import java.time.LocalDate;

public class IncomeDTO {

	double invoiceamount;
	
	LocalDate bookCreatedOn;
	
	public IncomeDTO() {
		// TODO Auto-generated constructor stub
	}

	public IncomeDTO(double invoiceamount, LocalDate bookCreatedOn) {
		super();
		this.invoiceamount = invoiceamount;
		this.bookCreatedOn = bookCreatedOn;
	}

	public double getInvoiceamount() {
		return invoiceamount;
	}

	public void setInvoiceamount(double invoiceamount) {
		this.invoiceamount = invoiceamount;
	}

	public LocalDate getBookCreatedOn() {
		return bookCreatedOn;
	}

	public void setBookCreatedOn(LocalDate bookCreatedOn) {
		this.bookCreatedOn = bookCreatedOn;
	}
	
	
}
