package com.HotelBooking.HotelBooking.DTO;


public class JwtResponse {

    private String jwtToken;

    private String userName;

  //  private String roles;

    public  JwtResponse(){
        super();
    }

    public JwtResponse(String jwtToken, String userName) {
        this.jwtToken = jwtToken;
        this.userName = userName;
       // this.roles = roles;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public String getUserName() {
        return userName;
    }

//    public String getRoles() {
//        return roles;
//    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

//    public void setRoles(String roles) {
//        this.roles = roles;
//    }

    @Override
    public String toString() {
        return "JwtResponse{" +
                "jwtToken='" + jwtToken + '\'' +
                ", userName='" + userName + '\'' +
               // ", roles='" + roles + '\'' +
                '}';
    }
}
