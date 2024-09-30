package com.HotelBooking.HotelBooking.Service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.HotelBooking.HotelBooking.DTO.ItemDTO;
import com.HotelBooking.HotelBooking.DTO.ItemListDTO;
import com.HotelBooking.HotelBooking.Entity.BookingMaster;
import com.HotelBooking.HotelBooking.Entity.Item;
import com.HotelBooking.HotelBooking.Exception.ResourceNotFoundException;
import com.HotelBooking.HotelBooking.Repository.BookingMasterRepository;
import com.HotelBooking.HotelBooking.Repository.ItemRepository;
import com.HotelBooking.HotelBooking.Service.IItemService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ItemServiceImpl implements IItemService {

	@Autowired
	private ItemRepository itemRepo;
	
	@Autowired
	private BookingMasterRepository bookRepo;

	@Override
	public ResponseEntity<?> addItemListToBooking(long bookId, ItemListDTO itemLt) {
		// TODO Auto-generated method stub
		BookingMaster bookObj = bookRepo.findById(bookId)
				.orElseThrow(() -> new ResourceNotFoundException("Error For Add Items!!! Booking not found"));

		for(ItemDTO i : itemLt.getItemList())
		{
			Item addItem = new Item();
			addItem.setBookId(bookObj);
			addItem.setItemName(i.getItemName());
			addItem.setItemPrice(i.getItemPrice());
			addItem.setItemQuantity(i.getItemQuantity());
			addItem.setSubTotal(i.getSubTotal());
			addItem.setItemDescription(i.getItemDescription());
			bookObj.getItemList().add(addItem);
		}
		
		bookRepo.save(bookObj);
		
		return ResponseEntity.ok("Items added to Booking Id "+bookObj.getBookingId());
	}

	@Override
	public ResponseEntity<?> deleteItemById(long bookId,long itemId) {
		BookingMaster bookObj = bookRepo.findById(bookId)
				.orElseThrow(() -> new ResourceNotFoundException("Error For Delete Items!!! Booking not found"));
		
		Item itemObj = itemRepo.findById(itemId)
				.orElseThrow(() -> new ResourceNotFoundException("Error For Delete Items!!! Item not Found"));
		
		itemRepo.delete(itemObj);

		return ResponseEntity.ok("Items deleted from Booking Id "+bookObj.getBookingId());
	}
}
