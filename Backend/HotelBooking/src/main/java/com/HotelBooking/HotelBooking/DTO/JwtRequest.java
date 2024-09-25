package com.HotelBooking.HotelBooking.DTO;


public class JwtRequest {
    private String userName;

    private String password;

    public  JwtRequest(){
        super();
    }

    public JwtRequest(String email, String password) {
        this.userName = email;
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public void setUserName(String email) {
        this.userName = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "JwtRequest{" +
                "email='" + userName + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
