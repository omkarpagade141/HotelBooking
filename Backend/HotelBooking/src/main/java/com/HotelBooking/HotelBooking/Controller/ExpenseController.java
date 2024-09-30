package com.HotelBooking.HotelBooking.Controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.Entity.Expense;
import com.HotelBooking.HotelBooking.Service.IExpenseService;

@RestController
@RequestMapping("/api/expense")
public class ExpenseController {

	@Autowired
	private IExpenseService expnseService;
	
	
	@PostMapping(value = "/add")
	ResponseEntity<?> addExpenseData(@RequestPart ("expenseObj") Expense expObj, 
			@RequestParam(value ="expimage",required = false) MultipartFile imageName ) throws IOException
	{
		return expnseService.insertExpenseData(expObj,imageName);
	}
	
	@GetMapping("/list")
	ResponseEntity<?> listOfExpenses()
	{
		return expnseService.allExpenseList();
	}
	
	@DeleteMapping("/delete/{expensId}")
	ResponseEntity<?> deleteExpense(@PathVariable long expensId) throws IOException
	{
		return expnseService.deleteExpenseById(expensId);
	}
	
	@GetMapping("/image/{expeId}")
	ResponseEntity<Resource> getExpenseImageById(@PathVariable long expeId)
	{
		return expnseService.fetchExpenseImageById(expeId);
	}
	
	@GetMapping("/get-expense/{expeId}")
	ResponseEntity<?> getExpeneDetailsById(@PathVariable long expeId)
	{
		return expnseService.getExpenseById(expeId);
	}
	
	@PutMapping("/update/{expeId}")
	ResponseEntity<?> updateExpeneDetailsById(@PathVariable long expeId, @RequestPart ("expenseObj") Expense expObj, 
			@RequestParam(value ="expimage",required = false) MultipartFile imageName ) throws IOException
	{
		return expnseService.updateExpenseById(expeId,expObj,imageName);
	}
	
}
