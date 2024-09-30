package com.HotelBooking.HotelBooking.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.HotelBooking.HotelBooking.DTO.IncomeDTO;
import com.HotelBooking.HotelBooking.Entity.BookingMaster;

@Repository
public interface BookingMasterRepository extends JpaRepository<BookingMaster, Long>{

	@Query("SELECT new com.HotelBooking.HotelBooking.DTO.IncomeDTO(i.invoiceamount, i.bookCreatedOn) FROM BookingMaster i ")
	List<IncomeDTO> incomeDashBoardList();

	
}
