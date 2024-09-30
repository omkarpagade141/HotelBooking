package com.HotelBooking.HotelBooking.Service.Impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.HotelBooking.HotelBooking.DTO.ExpenseListDTO;
import com.HotelBooking.HotelBooking.Entity.Expense;
import com.HotelBooking.HotelBooking.Exception.ResourceNotFoundException;
import com.HotelBooking.HotelBooking.Repository.ExpenseRepository;
import com.HotelBooking.HotelBooking.Service.IExpenseService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ExpenseServiceImpl implements IExpenseService {

	@Autowired
	private ExpenseRepository expenseRepo;
	
	public static String uploadDirectory = System.getProperty("user.dir") + "/src/main/webapp/images";

	

	@Override
	public ResponseEntity<?> insertExpenseData(Expense expObj, MultipartFile imageName) throws IOException {
		// TODO Auto-generated method stub
		if( imageName != null)
		{
			// Get the current date and time
			LocalDateTime now = LocalDateTime.now();

			// Define the format you want for the file name (e.g., yyyyMMdd_HHmmss)
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");

			// Generate a unique file name with the current date and time
			String currentTime = now.format(formatter);

			// Get the file extension
			String originalFileName = imageName.getOriginalFilename();
			String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

			// Construct the new file name with date-time as name and retain the file
			// extension
			String newFileName = currentTime + fileExtension;

			// Save the file with the new name
			Path fileNameAndPath = Paths.get(uploadDirectory, newFileName);
			Files.write(fileNameAndPath, imageName.getBytes());

			// Set the new file name in customerMaster object
			expObj.setExpImagePath(newFileName);		}
		expenseRepo.save(expObj);
		return new ResponseEntity<>("Expense Inserted Successfully",HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<?> allExpenseList() {
		// TODO Auto-generated method stub
		List<ExpenseListDTO> list = expenseRepo.listOfExpenses();
		return ResponseEntity.ok(list);
	}

	@Override
	public ResponseEntity<?> deleteExpenseById(long expensId) throws IOException {
		// TODO Auto-generated method stub
		Expense expObj = expenseRepo.findById(expensId).orElseThrow(()-> new ResourceNotFoundException("Expense Not found"));
		if(expObj.getExpImagePath() !=null)
		{
			Path fileNameAndPath = Paths.get(uploadDirectory, expObj.getExpImagePath());
			Files.delete(fileNameAndPath);
			System.out.println("Expense image deleted");
		}
		
		
		expenseRepo.delete(expObj);
		return ResponseEntity.ok("Expense deleted successfully");
	}

	// For GET Image of Expense from expense folder
    private final Path expenseImageFolder = Paths.get("expense_bills");
    
	@Override
	public ResponseEntity<Resource> fetchExpenseImageById(long expeId) {
		// TODO Auto-generated method stub
		try {
			Expense expObj = expenseRepo.findById(expeId).orElseThrow(()-> new ResourceNotFoundException("Expense Not found"));
			
			
				Path imgPath = expenseImageFolder.resolve(expObj.getExpImagePath());
				File imgFile = imgPath.toFile();
				
				if(!imgFile.exists())
	    		{
	    			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    		}
				
				Resource imageResouce = new FileSystemResource(imgFile);
		
				return ResponseEntity.ok()
						.header(HttpHeaders.CONTENT_TYPE, "image/jpeg") // Adjust MIME type based on your image type
	                    .body(imageResouce);
			
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		

	}

	@Override
	public ResponseEntity<?> getExpenseById(long expeId) {
		
		Expense expObj = expenseRepo.findById(expeId).orElseThrow(()-> new ResourceNotFoundException("Expense Not found"));
		
		return ResponseEntity.ok(expObj);
	}

	@Override
	public ResponseEntity<?> updateExpenseById(long expeId, Expense expObj, MultipartFile imageName) throws IOException {
		// TODO Auto-generated method stub
		Expense expExist = expenseRepo.findById(expeId).orElseThrow(()-> new ResourceNotFoundException("Expense Not found"));
		
			if (imageName != null) {
				
				if(expExist.getExpImagePath()!=null)
				{
					Path fileNameAndPath = Paths.get(uploadDirectory, expExist.getExpImagePath());
					Files.delete(fileNameAndPath);
					System.out.println("Expense image deleted");
				}
				// Get the current date and time
				LocalDateTime now = LocalDateTime.now();

				// Define the format you want for the file name (e.g., yyyyMMdd_HHmmss)
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");

				// Generate a unique file name with the current date and time
				String currentTime = now.format(formatter);

				// Get the file extension
				String originalFileName = imageName.getOriginalFilename();
				String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));

				// Construct the new file name with date-time as name and retain the file
				// extension
				String newFileName = currentTime + fileExtension;

				// Save the file with the new name
				Path fileNameAndPath = Paths.get(uploadDirectory, newFileName);
				Files.write(fileNameAndPath, imageName.getBytes());
				expExist.setExpImagePath(newFileName);
			}
			
			expExist.setExpAmount(expObj.getExpAmount());
			expExist.setExpType(expObj.getExpType());
			expExist.setExpDate(expObj.getExpDate());
			expExist.setExpNote(expObj.getExpNote());
		
			expenseRepo.save(expExist);
			return new ResponseEntity<>("Expense Updated Successfully",HttpStatus.OK);
	}

	
	
	
}
