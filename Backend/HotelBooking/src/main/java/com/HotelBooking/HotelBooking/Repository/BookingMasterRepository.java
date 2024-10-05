package com.HotelBooking.HotelBooking.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.HotelBooking.HotelBooking.DTO.ActiveRoomIdDTO;
import com.HotelBooking.HotelBooking.DTO.IncomeDTO;
import com.HotelBooking.HotelBooking.Entity.BookingMaster;
import com.HotelBooking.HotelBooking.Entity.ContentMaster;

@Repository
public interface BookingMasterRepository extends JpaRepository<BookingMaster, Long>{

	@Query("SELECT new com.HotelBooking.HotelBooking.DTO.IncomeDTO(i.invoiceamount, i.bookCreatedOn) FROM BookingMaster i ")
	List<IncomeDTO> incomeDashBoardList();

	@Query("SELECT new com.HotelBooking.HotelBooking.DTO.ActiveRoomIdDTO (r.roomTypeObj.contentId) " +
		       "FROM BookingMaster r " +
		       "WHERE ((r.checkInDate = :startDate AND r.checkInTime <= :endTime) OR " +
		              "(r.checkOutDate = :endDate AND r.checkOutTime >= :startTime) OR " +
		              "((r.checkInDate BETWEEN :startDate AND :endDate) OR " +
		              "(r.checkOutDate BETWEEN :startDate AND :endDate) OR " +
		              "(:startDate BETWEEN r.checkInDate AND r.checkOutDate) OR " +
		              "(:endDate BETWEEN r.checkInDate AND r.checkOutDate)))")
		List<ActiveRoomIdDTO> findAllAvailableRooms(
		    @Param("startDate") LocalDate checkInDate,
		    @Param("endDate") LocalDate checkOutDate,
		    @Param("startTime") LocalTime checkInTime,
		    @Param("endTime") LocalTime checkOutTime);

}
