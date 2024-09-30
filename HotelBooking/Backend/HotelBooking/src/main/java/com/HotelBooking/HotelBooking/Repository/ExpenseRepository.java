package com.HotelBooking.HotelBooking.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.HotelBooking.HotelBooking.DTO.ExpenseListDTO;
import com.HotelBooking.HotelBooking.Entity.Expense;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long>{

	@Query("SELECT new com.HotelBooking.HotelBooking.DTO.ExpenseListDTO( e.expensId, e.expAmount, e.expType, e.expDate, e.expNote) FROM Expense e ")
	List<ExpenseListDTO> listOfExpenses();

}
