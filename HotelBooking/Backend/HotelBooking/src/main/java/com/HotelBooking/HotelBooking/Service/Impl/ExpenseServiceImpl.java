package com.HotelBooking.HotelBooking.Service.Impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ExpenseServiceImpl implements IExpenseService {

	@Autowired
	private ExpenseRepository expenseRepo;

	// For Image set
	@Value("${upload.expenses}")
	private String folderName;

	@PostConstruct
	public void myInit() {
		System.out.println("in Expense Service" + folderName);
		// chk of folder exists --o.w create one!
		File path = new File(folderName);
		if (!path.exists()) {
			path.mkdirs();
		} else
			System.out.println("Expense image folder alrdy exists....");
	}

	@Override
	public ResponseEntity<?> insertExpenseData(Expense expObj, MultipartFile imageName) throws IOException {
		// TODO Auto-generated method stub
		if(!imageName.isEmpty() && imageName != null)
		{
			long currentTimeMills = System.currentTimeMillis();
			String targetPath = folderName + File.separator+currentTimeMills+".jpg";
			Files.copy(imageName.getInputStream(), Paths.get(targetPath),StandardCopyOption.REPLACE_EXISTING);
			expObj.setExpImagePath(currentTimeMills+".jpg");
			System.out.println("Expense Bill Inserted !!!");
		}
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
		if(!expObj.getExpImagePath().isEmpty() && expObj.getExpImagePath() !=null)
		{
			Path expeTargetPath = Paths.get(folderName + File.separator+expObj.getExpImagePath()) ;
			Files.delete(expeTargetPath);
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
	
	
}
