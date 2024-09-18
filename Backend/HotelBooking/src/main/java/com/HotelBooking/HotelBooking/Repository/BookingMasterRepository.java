package com.HotelBooking.HotelBooking.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.HotelBooking.HotelBooking.Entity.BookingMaster;

@Repository
public interface BookingMasterRepository extends JpaRepository<BookingMaster, Long>{

	
}
