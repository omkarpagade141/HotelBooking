package com.HotelBooking.HotelBooking.Controller;

import java.io.IOException;
import java.lang.StackWalker.Option;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

import com.HotelBooking.HotelBooking.Entity.ContentMaster;
import com.HotelBooking.HotelBooking.Service.ContentMasterService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("api/content")
@CrossOrigin(origins = "*")
public class ContentMasterController {
	
	@Autowired
	ContentMasterService contentMasterService;
	
    
    @PostMapping
    public ResponseEntity<?> createContentMaster(
            @RequestPart("content") ContentMaster contentmaster,
            @RequestParam(value = "image", required = false) MultipartFile file) throws IOException {
      
        return contentMasterService.addContent(contentmaster,file);
    }

    
	   @GetMapping
	    public ResponseEntity<List<ContentMaster>> getAllContents() {
	        List<ContentMaster> contents = contentMasterService.getAllContents();
	        return new ResponseEntity<>(contents, HttpStatus.OK);
	    }
	   
	   @GetMapping("/{contentId}")
	    public ResponseEntity<ContentMaster> getContentById(@PathVariable Long contentId) {
	        Optional<ContentMaster> content = contentMasterService.getContentById(contentId);
	        if (content.isPresent()) {
	            return new ResponseEntity<>(content.get(), HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	   
//	   @PutMapping
//	   public ResponseEntity<ContentMaster> editContentMatser(){
//		   return new ResponseEntity<ContentMaster>(HttpStatus.OK);
//	   }
//	   
	
	   
	   @DeleteMapping("/{contentId}")
		public ResponseEntity<?> deleteContent(@PathVariable Long contentId ) {
			try {
				Optional<ContentMaster> CheckcontentMaster =contentMasterService.getContentById(contentId);
				if(CheckcontentMaster.isPresent()) {
			        contentMasterService.deleteById(contentId);
					return new ResponseEntity<>(true, HttpStatus.OK);

				}
				return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
			} catch (Exception e) {
				return new ResponseEntity<>("something Wrong on server", HttpStatus.NOT_FOUND);
			}
		}
	   
	   @PutMapping("/{contentId}")
	   public ResponseEntity<?> updateContentMaster(
	            @PathVariable Long contentId,
	            @RequestPart("content") ContentMaster contentMaster,
	            @RequestParam(value = "image", required = false) MultipartFile file) throws IOException {
	        
	       return contentMasterService.updateContent(contentId, contentMaster, file);
	    }
	   
	   @GetMapping("/content-field")
	  public ResponseEntity <List<Map<String,Object>>> getSelectedContainFields(){
		 List<  Map<String,Object>> contentFields= contentMasterService.getSelectedContainFields();
		    return new ResponseEntity<>(contentFields, HttpStatus.OK);
	   }
	}

