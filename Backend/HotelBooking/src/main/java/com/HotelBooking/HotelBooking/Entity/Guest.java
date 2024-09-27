package com.HotelBooking.HotelBooking.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "guest_master")
public class Guest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "guest_id")
	private long guestId;
	
	@Column(name = "guest_Name")
	private String guestName;
	
	@Column(name = "totalGuest")
	private int totalGuestsNum;
	
	@Column(name = "image_path")
	private String guestProofImagePath;
	
	@ManyToOne
	@JoinColumn(name = "book_id")
	private BookingMaster bookId;
	
	public Guest() {
		// TODO Auto-generated constructor stub
	}

	public Guest(long guestId, String guestName, int totalGuestsNum, String guestProofImagePath, BookingMaster bookId) {
		super();
		this.guestId = guestId;
		this.guestName = guestName;
		this.totalGuestsNum = totalGuestsNum;
		this.guestProofImagePath = guestProofImagePath;
		this.bookId = bookId;
	}

	public long getGuestId() {
		return guestId;
	}

	public void setGuestId(long guestId) {
		this.guestId = guestId;
	}

	public String getGuestName() {
		return guestName;
	}

	public void setGuestName(String guestName) {
		this.guestName = guestName;
	}

	public int getTotalGuestsNum() {
		return totalGuestsNum;
	}

	public void setTotalGuestsNum(int totalGuestsNum) {
		this.totalGuestsNum = totalGuestsNum;
	}

	public String getGuestProofImagePath() {
		return guestProofImagePath;
	}

	public void setGuestProofImagePath(String guestProofImagePath) {
		this.guestProofImagePath = guestProofImagePath;
	}

	public BookingMaster getBookId() {
		return bookId;
	}

	public void setBookId(BookingMaster bookId) {
		this.bookId = bookId;
	}

	@Override
	public String toString() {
		return "Guest [guestId=" + guestId + ", guestName=" + guestName + ", totalGuestsNum=" + totalGuestsNum
				+ ", guestProofImagePath=" + guestProofImagePath + ", bookId=" + bookId + "]";
	}
	
	
}
