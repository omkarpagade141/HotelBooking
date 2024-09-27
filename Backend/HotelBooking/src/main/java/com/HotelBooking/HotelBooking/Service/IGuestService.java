package com.HotelBooking.HotelBooking.Service;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.Entity.Guest;

public interface IGuestService {

	ResponseEntity<?> addGuestObjtoBooking(long bookingId, Guest guestObj, MultipartFile idProof) throws IOException;

	ResponseEntity<?> showGuestDetailsByBookId(long bookingId);

}
