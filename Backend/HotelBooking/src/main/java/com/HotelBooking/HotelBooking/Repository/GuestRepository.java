package com.HotelBooking.HotelBooking.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.HotelBooking.HotelBooking.Entity.Guest;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long>{

	@Query("SELECT g FROM Guest g WHERE g.bookId.bookingId = ?1")
	Optional<Guest> findByBookingId(long bookingId);

}
