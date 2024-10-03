package com.HotelBooking.HotelBooking.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.DTO.BookingDTO;
import com.HotelBooking.HotelBooking.DTO.DashboardDTO;
import com.HotelBooking.HotelBooking.Entity.BookingMaster;

public interface BookingMasterService {

	
	public BookingMaster addBooking(long custId, BookingDTO bookingMaster,MultipartFile file) throws IOException;
	
	public List<BookingMaster> getallBooking();
	
	public Optional<BookingMaster> getBooking(long bookingId);
	
	public ResponseEntity<?> deleteBooking(long bookingId) throws IOException;
	
	public BookingMaster updateBooking(long bookingId ,BookingDTO bookingMaster,MultipartFile file) throws IOException;

	public DashboardDTO showDashBoardInfo();

	public ResponseEntity<?> getAvilableRoomsList(BookingDTO bookingMaster);

}
