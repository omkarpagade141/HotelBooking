//package com.HotelBooking.HotelBooking.Entity;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//
//@Entity
//@Table(name = "item_master")
//public class Item {
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "item_id")
//	private long itemId;
//	
//	private String itemName;
//	
//	private double itemPrice;
//	
//	private int itemQuantity;
//	
//	private double subTotal;
//	
//	private String itemDescription;
//	
//	@ManyToOne
//	@JoinColumn(name = "book_id")
//	private Booking bookId;
//}
