package com.HotelBooking.HotelBooking.DTO;

import java.util.ArrayList;
import java.util.List;

public class ItemListDTO {

	private List<ItemDTO> itemList = new ArrayList<ItemDTO>();
	
	public ItemListDTO() {
		// TODO Auto-generated constructor stub
	}

	public ItemListDTO(List<ItemDTO> itemList) {
		super();
		this.itemList = itemList;
	}

	public List<ItemDTO> getItemList() {
		return itemList;
	}

	public void setItemList(List<ItemDTO> itemList) {
		this.itemList = itemList;
	}
	
	
}
