package com.HotelBooking.HotelBooking.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.HotelBooking.HotelBooking.DTO.ItemListDTO;
import com.HotelBooking.HotelBooking.Service.IItemService;

@RestController
@RequestMapping("/api/items")
public class ItemController {
	
	@Autowired
	private IItemService itemService;
	
	
	@PostMapping("/booking/{bookId}")
	ResponseEntity<?> addItemsToBookingId(@PathVariable long  bookId,@RequestBody ItemListDTO itemLt)
	{
		return itemService.addItemListToBooking(bookId,itemLt);
	}
	
	@DeleteMapping("/booking/{bookId}/item/{itemId}")
	ResponseEntity<?> deleteSingleItemById(@PathVariable long  bookId,@PathVariable long  itemId)
	{
		return itemService.deleteItemById(bookId,itemId);
	}

}
