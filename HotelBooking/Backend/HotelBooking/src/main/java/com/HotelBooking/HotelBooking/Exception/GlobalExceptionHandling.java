package com.HotelBooking.HotelBooking.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;



@RestControllerAdvice
public class GlobalExceptionHandling {

	@ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundExcep(ResourceNotFoundException error)
    {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error.getMessage());
    }
}
