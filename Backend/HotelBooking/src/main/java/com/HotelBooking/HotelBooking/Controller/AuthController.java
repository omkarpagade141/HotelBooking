package com.HotelBooking.HotelBooking.Controller;

import com.HotelBooking.HotelBooking.DTO.ChangeUserPasswordDTO;
import com.HotelBooking.HotelBooking.DTO.JwtRequest;
import com.HotelBooking.HotelBooking.DTO.JwtResponse;
import com.HotelBooking.HotelBooking.Entity.User;
import com.HotelBooking.HotelBooking.Service.Impl.UserService;
import com.HotelBooking.HotelBooking.security.JwtHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtHelper helper;

    @Autowired
    UserService userService;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);


    @PostMapping("/signup")
    public ResponseEntity<String> addUser(@RequestBody User user){
        return userService.newUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {

        this.doAuthenticate(request.getEmail(), request.getPassword());


        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = this.helper.generateToken(userDetails);

//        JwtResponse response = JwtResponse.builder()
//                .jwtToken(token)
//                .userName(userDetails.getUsername())
//                .build();

        JwtResponse response = new JwtResponse();
        response.setJwtToken(token);
        response.setUserName(userDetails.getUsername());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);


        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }

    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> exceptionHandler() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Credentials Invalid !!");
    }

    //Change Password 
    @PostMapping("/change-password/{userId}")
    ResponseEntity<?> changeUserPassword(@PathVariable int userId,@RequestBody ChangeUserPasswordDTO updtPassObj)
    {
    	return userService.changeUserPassword(userId, updtPassObj);
    }

}
