package com.HotelBooking.HotelBooking.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

public class BookingDTO {

	LocalDate checkInDate;
	LocalTime checkInTime;

	LocalDate checkOutDate;

	LocalTime checkOutTime;
	
	String bookingDescription; 
	

	double invoiceamount;
	String image;
	
	long roomContentId;

	public BookingDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public BookingDTO(LocalDate checkInDate, LocalTime checkInTime, LocalDate checkOutDate, LocalTime checkOutTime,
			String bookingDescription, double invoiceamount, String image, long roomContentId) {
		super();
		this.checkInDate = checkInDate;
		this.checkInTime = checkInTime;
		this.checkOutDate = checkOutDate;
		this.checkOutTime = checkOutTime;
		this.bookingDescription = bookingDescription;
		this.invoiceamount = invoiceamount;
		this.image = image;
		this.roomContentId = roomContentId;
	}

	public LocalDate getCheckInDate() {
		return checkInDate;
	}

	public void setCheckInDate(LocalDate checkInDate) {
		this.checkInDate = checkInDate;
	}

	public LocalTime getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(LocalTime checkInTime) {
		this.checkInTime = checkInTime;
	}

	public LocalDate getCheckOutDate() {
		return checkOutDate;
	}

	public void setCheckOutDate(LocalDate checkOutDate) {
		this.checkOutDate = checkOutDate;
	}

	public LocalTime getCheckOutTime() {
		return checkOutTime;
	}

	public void setCheckOutTime(LocalTime checkOutTime) {
		this.checkOutTime = checkOutTime;
	}

	public String getBookingDescription() {
		return bookingDescription;
	}

	public void setBookingDescription(String bookingDescription) {
		this.bookingDescription = bookingDescription;
	}

	public double getInvoiceamount() {
		return invoiceamount;
	}

	public void setInvoiceamount(double invoiceamount) {
		this.invoiceamount = invoiceamount;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public long getRoomContentId() {
		return roomContentId;
	}

	public void setRoomContentId(long roomContentId) {
		this.roomContentId = roomContentId;
	}
	
	
	
	
	
}
