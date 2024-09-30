package com.HotelBooking.HotelBooking.Service;

import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.Entity.Expense;

public interface IExpenseService {

	ResponseEntity<?> insertExpenseData(Expense expObj, MultipartFile imageName) throws IOException;

	ResponseEntity<?> allExpenseList();

	ResponseEntity<?> deleteExpenseById(long expensId) throws IOException;

	ResponseEntity<Resource> fetchExpenseImageById(long expeId);

	ResponseEntity<?> getExpenseById(long expeId);

	ResponseEntity<?> updateExpenseById(long expeId, Expense expObj, MultipartFile imageName) throws IOException;

}
