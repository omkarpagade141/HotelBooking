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
@Table(name = "item_master")
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "item_id")
	private long itemId;
	
	private String itemName;
	
	private double itemPrice;
	
	private int itemQuantity;
	
	private double subTotal;
	
	private String itemDescription;
	
	@ManyToOne
	@JoinColumn(name = "book_id")
	private BookingMaster bookId;
	
	public Item() {
		// TODO Auto-generated constructor stub
	}

	public Item(long itemId, String itemName, double itemPrice, int itemQuantity, double subTotal,
			String itemDescription, BookingMaster bookId) {
		super();
		this.itemId = itemId;
		this.itemName = itemName;
		this.itemPrice = itemPrice;
		this.itemQuantity = itemQuantity;
		this.subTotal = subTotal;
		this.itemDescription = itemDescription;
		this.bookId = bookId;
	}

	public long getItemId() {
		return itemId;
	}

	public void setItemId(long itemId) {
		this.itemId = itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public double getItemPrice() {
		return itemPrice;
	}

	public void setItemPrice(double itemPrice) {
		this.itemPrice = itemPrice;
	}

	public int getItemQuantity() {
		return itemQuantity;
	}

	public void setItemQuantity(int itemQuantity) {
		this.itemQuantity = itemQuantity;
	}

	public double getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(double subTotal) {
		this.subTotal = subTotal;
	}

	public String getItemDescription() {
		return itemDescription;
	}

	public void setItemDescription(String itemDescription) {
		this.itemDescription = itemDescription;
	}

	public BookingMaster getBookId() {
		return bookId;
	}

	public void setBookId(BookingMaster bookId) {
		this.bookId = bookId;
	}

	@Override
	public String toString() {
		return "Item [itemId=" + itemId + ", itemName=" + itemName + ", itemPrice=" + itemPrice + ", itemQuantity="
				+ itemQuantity + ", subTotal=" + subTotal + ", itemDescription=" + itemDescription + ", bookId="
				+ bookId + "]";
	}
	
	
}
