package com.HotelBooking.HotelBooking.DTO;

import java.util.ArrayList;
import java.util.List;

public class DashboardDTO {

	List<IncomeDTO> incomeList = new ArrayList<IncomeDTO>();

	List<ExpenseDTO> expenseList = new ArrayList<ExpenseDTO>();
	
	public DashboardDTO() {
		// TODO Auto-generated constructor stub
	}

	public DashboardDTO(List<IncomeDTO> incomeList, List<ExpenseDTO> expenseList) {
		super();
		this.incomeList = incomeList;
		this.expenseList = expenseList;
	}

	public List<IncomeDTO> getIncomeList() {
		return incomeList;
	}

	public void setIncomeList(List<IncomeDTO> incomeList) {
		this.incomeList = incomeList;
	}

	public List<ExpenseDTO> getExpenseList() {
		return expenseList;
	}

	public void setExpenseList(List<ExpenseDTO> expenseList) {
		this.expenseList = expenseList;
	}
	
	
}
