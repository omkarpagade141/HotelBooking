package com.HotelBooking.HotelBooking.DTO;

public class ItemDTO {

private String itemName;
	
	private double itemPrice;
	
	private int itemQuantity;
	
	private double subTotal;
	
	private String itemDescription;
	
	public ItemDTO() {
		// TODO Auto-generated constructor stub
	}

	public ItemDTO(String itemName, double itemPrice, int itemQuantity, double subTotal, String itemDescription) {
		super();
		this.itemName = itemName;
		this.itemPrice = itemPrice;
		this.itemQuantity = itemQuantity;
		this.subTotal = subTotal;
		this.itemDescription = itemDescription;
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
	
	
}
