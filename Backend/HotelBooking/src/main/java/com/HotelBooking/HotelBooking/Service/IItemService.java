package com.HotelBooking.HotelBooking.Service;

import org.springframework.http.ResponseEntity;

import com.HotelBooking.HotelBooking.DTO.ItemListDTO;

public interface IItemService {

	ResponseEntity<?> addItemListToBooking(long bookId, ItemListDTO itemLt);

	ResponseEntity<?> deleteItemById(long bookId, long itemId);

}
