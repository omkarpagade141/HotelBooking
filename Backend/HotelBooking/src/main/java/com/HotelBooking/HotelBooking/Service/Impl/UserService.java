package com.HotelBooking.HotelBooking.Service.Impl;

import com.HotelBooking.HotelBooking.Entity.User;
import com.HotelBooking.HotelBooking.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    List<User> store = new ArrayList<>();
    @Autowired
    PasswordEncoder passwordEncoder;

//    public UserService() {
//        store.add(new User(1, "Gaurav Pawar", "gaurav@gmail.com","123","ADMIN"));
//        store.add(new User(2, "Mayur Pol", "mayur@gmail.com","123","ADMIN"));
//        store.add(new User(3, "Nitin Bone", "nitin@gmail.com","123","ADMIN"));
//        store.add(new User(4, "Omkar Raja", "omkar@gmail.com","123","ADMIN"));
//
//    }

    public List<User> getUsers(){
        return this.store;
    }


    public User newUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }



}
