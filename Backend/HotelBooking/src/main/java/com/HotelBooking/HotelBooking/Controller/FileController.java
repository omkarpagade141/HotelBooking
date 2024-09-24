package com.HotelBooking.HotelBooking.Controller;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FileController {

	public static String uploadDirectory = System.getProperty("user.dir") + "/src/main/webapp/images";
	private final Path imageFolder = Paths.get(uploadDirectory);
	
	
	@GetMapping("/api/images/{imageName}")
	ResponseEntity<Resource> getImage(@PathVariable String imageName)
	{
		try {
			Path imgPath = imageFolder.resolve(imageName);
			 File imageFile = imgPath.toFile();
	            if (!imageFile.exists()) {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	            }
	            Resource resource = new FileSystemResource(imageFile);

	            return ResponseEntity.ok()
	                    .header(HttpHeaders.CONTENT_TYPE, "image/jpeg") // Adjust MIME type based on your image type
	                    .body(resource);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	        }
	}
}
