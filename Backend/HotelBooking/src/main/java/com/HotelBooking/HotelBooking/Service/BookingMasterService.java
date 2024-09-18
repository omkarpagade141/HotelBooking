package com.HotelBooking.HotelBooking.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.Entity.BookingMaster;

public interface BookingMasterService {

	
	public BookingMaster addBooking(BookingMaster bookingMaster,MultipartFile file) throws IOException;
	
	public List<BookingMaster> getallBooking();
	
	public Optional<BookingMaster> getBooking(long bookingId);
	
	public void deleteBooking(long bookingId);
	
	public BookingMaster updateBooking(long bookingId ,BookingMaster bookingMaster,MultipartFile file) throws IOException;

}
