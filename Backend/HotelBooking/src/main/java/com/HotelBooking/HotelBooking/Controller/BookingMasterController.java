package com.HotelBooking.HotelBooking.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.Entity.BookingMaster;
import com.HotelBooking.HotelBooking.Service.BookingMasterService;

@RestController
@RequestMapping("api/Booking")
public class BookingMasterController {

	@Autowired 
	BookingMasterService bookingMasterService;
	
	@PostMapping("/reserve/{custId}")
	public BookingMaster addbooking(@PathVariable long custId,@RequestPart("bookimg") BookingMaster bookingMaster,@RequestParam(value = "image",required =  false) MultipartFile file) throws IOException {
		return bookingMasterService.addBooking(custId,bookingMaster,file);
	}
	
	@GetMapping("/{bookingId}")
	public ResponseEntity<?> getBookingById(@PathVariable long bookingId) {
		Optional<BookingMaster> bookingMaster= bookingMasterService.getBooking(bookingId);
		if(bookingMaster.isPresent()) {
			return new ResponseEntity<>(bookingMaster.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>("Booking Id Is Not Present", HttpStatus.NOT_FOUND);
		}
	}
	@GetMapping
	public ResponseEntity<?> getallBooking() {
		List<BookingMaster> bookingMaster2=  bookingMasterService.getallBooking();
		if(!bookingMaster2.isEmpty()) {
		return new ResponseEntity<>(bookingMaster2, HttpStatus.OK);
		}else {
			return new ResponseEntity<>("Booking master is Empty!!!", HttpStatus.OK);
		}
	}
	@DeleteMapping("/{bookingId}")
	public ResponseEntity<?> deleteBooking(@PathVariable long bookingId) {
		
		return bookingMasterService.deleteBooking(bookingId);

			}
	@PutMapping("/{bookingId}")
	public ResponseEntity<?> updateBooking(@RequestPart("booking") BookingMaster bookingMaster,@PathVariable("bookingId")long bookingId,@RequestParam( value = "image" ,required = false) MultipartFile file) throws IOException {
		BookingMaster bookingMaster2=bookingMasterService.updateBooking(bookingId, bookingMaster,file);
				if(bookingMaster2!=null) {
					return new ResponseEntity<>(bookingMaster2, HttpStatus.OK);
				}else{
					return new ResponseEntity<>("Booking Id Is Not Found!!!", HttpStatus.NOT_FOUND);
				}
	}
}
