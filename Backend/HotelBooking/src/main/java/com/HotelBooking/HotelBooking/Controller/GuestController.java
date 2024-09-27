package com.HotelBooking.HotelBooking.Controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.Entity.Guest;
import com.HotelBooking.HotelBooking.Service.IGuestService;

@RestController
@RequestMapping("api/guest")
public class GuestController {

	@Autowired
	private IGuestService guestService;
	
	@PostMapping("/add/{bookingId}")
	ResponseEntity<?> addGuestDetailsToBookingId(@PathVariable long bookingId, @RequestPart Guest guestObj ,
			@RequestParam (value = "idImage", required = false) MultipartFile idProof )
	{
		try {
			return guestService.addGuestObjtoBooking(bookingId,guestObj,idProof);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<>("Internal Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/show/guest-info/{bookingId}")
	ResponseEntity<?> showGuestInfoByBookingId(@PathVariable long bookingId)
	{
		return guestService.showGuestDetailsByBookId(bookingId);
	}
}
