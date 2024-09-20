package com.HotelBooking.HotelBooking.Entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class BookingMaster {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long bookingId;
	@ManyToOne
	@JoinColumn(name = "customer_id", nullable = false)
	private CustomerMaster customer;

	LocalDate checkInDate;
	LocalTime checkInTime;

	LocalDate checkOutDate;

	LocalTime checkOutTime;

	double invoiceamount;
	String image;
	
//	@OneToMany(mappedBy = "bookId")
//	private List<Item> itemList;


	public long getBookingId() {
		return bookingId;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public void setBookingId(long bookingId) {
		this.bookingId = bookingId;
	}

	public CustomerMaster getCustomer() {
		return customer;
	}

	public void setCustomer(CustomerMaster customer) {
		this.customer = customer;
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

	public double getInvoiceamount() {
		return invoiceamount;
	}

	public void setInvoiceamount(double invoiceamount) {
		this.invoiceamount = invoiceamount;
	}

	@Override
	public String toString() {
		return "BookingMaster [bookingId=" + bookingId + ", customer=" + customer + ", checkInDate=" + checkInDate
				+ ", checkInTime=" + checkInTime + ", checkOutDate=" + checkOutDate + ", checkOutTime=" + checkOutTime
				+ ", invoiceamount=" + invoiceamount + ", image=" + image + "]";
	}

	
}
