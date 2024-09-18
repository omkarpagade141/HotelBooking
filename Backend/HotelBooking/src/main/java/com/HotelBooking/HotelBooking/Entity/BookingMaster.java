package com.HotelBooking.HotelBooking.Entity;

import java.util.List;

import org.antlr.v4.runtime.misc.NotNull;

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

	String checkInDate;
	String checkInTime;

	String checkOutDate;

	String checkOutTime;

	String invoiceamount;
	String image;
	
	//List<itemMaster> list;
	
	

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

	public String getCheckInDate() {
		return checkInDate;
	}

	public void setCheckInDate(String checkInDate) {
		this.checkInDate = checkInDate;
	}

	public String getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(String checkInTime) {
		this.checkInTime = checkInTime;
	}

	public String getCheckOutDate() {
		return checkOutDate;
	}

	public void setCheckOutDate(String checkOutDate) {
		this.checkOutDate = checkOutDate;
	}

	public String getCheckOutTime() {
		return checkOutTime;
	}

	public void setCheckOutTime(String checkOutTime) {
		this.checkOutTime = checkOutTime;
	}

	public String getInvoiceamount() {
		return invoiceamount;
	}

	public void setInvoiceamount(String invoiceamount) {
		this.invoiceamount = invoiceamount;
	}

	@Override
	public String toString() {
		return "BookingMaster [bookingId=" + bookingId + ", customer=" + customer + ", checkInDate=" + checkInDate
				+ ", checkInTime=" + checkInTime + ", checkOutDate=" + checkOutDate + ", checkOutTime=" + checkOutTime
				+ ", invoiceamount=" + invoiceamount + ", image=" + image + "]";
	}

	
}
