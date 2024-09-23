//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//    private Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);
//
//    @Autowired
//    private JwtHelper jwtHelper;
//
//    @Autowired
//    private UserDetailsService userDetailsService;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        String requestHeader = request.getHeader("Authorization");
//        String username = null;
//        String token = null;
//
//        if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
//            token = requestHeader.substring(7);
//            try {
//                username = this.jwtHelper.getUsernameFromToken(token);
//            } catch (ExpiredJwtException e) {
//                logger.info("Given JWT token is expired !!");
//                filterChain.doFilter(request, response);
//                return;
//            } catch (IllegalArgumentException | MalformedJwtException e) {
//                logger.info("Invalid or illegal JWT token!");
//                e.printStackTrace();
//            }
//        }
//
//        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
//            boolean validateToken = this.jwtHelper.validateToken(token, userDetails);
//
//            if (validateToken) {
//                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
//                        userDetails, null, userDetails.getAuthorities());
//                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//
//                // Generate a new token and attach it to the request
////                String newToken = jwtHelper.refreshToken(token);
////                logger.info("New token issued: {}", newToken);
////
////                // Pass the new token to the controller by setting it in the request
////                request.setAttribute("newToken", newToken);
////
////                // Optionally, set the new token in the response header if needed
////                response.setHeader("Authorization", "Bearer " + newToken);
//
//
//            }
//        }
//
//        // Continue with the filter chain
//        filterChain.doFilter(request, response);
//    }
//}

//package com.HotelBooking.HotelBooking.security;
//
//import io.jsonwebtoken.ExpiredJwtException;
//import io.jsonwebtoken.MalformedJwtException;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    @Autowired
//    private JwtHelper jwtHelper;
//
//    @Autowired
//    private UserDetailsService userDetailsService;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        String requestHeader = request.getHeader("Authorization");
//        String username = null;
//        String token = null;
//
//        if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
//            token = requestHeader.substring(7);
//            try {
//                // Validate the token and get the username
//                username = this.jwtHelper.getUsernameFromToken(token);
//            } catch (ExpiredJwtException e) {
//                logger.info("Given JWT token is expired !!");
//                // No action needed; continue with the filter chain
//            } catch (IllegalArgumentException | MalformedJwtException e) {
//                logger.info("Invalid or illegal JWT token!");
//            }
//        }
//
//        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
//            boolean validateToken = this.jwtHelper.validateToken(token, userDetails);
//
//            if (validateToken) {
//                // Refresh the expiration time in the existing token
//                jwtHelper.refreshTokenExpiration(token);
//
//                // Set the authentication in the security context
//                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
//                        userDetails, null, userDetails.getAuthorities());
//                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//        }
//
//        // Continue with the filter chain
//        filterChain.doFilter(request, response);
//    }
//
//}

package com.HotelBooking.HotelBooking.security;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


     private Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);
    @Autowired
    private JwtHelper jwtHelper;


    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

//        try {
//            Thread.sleep(500);
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        }
        //Authorization

        String requestHeader = request.getHeader("Authorization");
        //Bearer 2352345235sdfrsfgsdfsdf
        logger.info(" Header :  {}", requestHeader);
        String username = null;
        String token = null;
        if (requestHeader != null && requestHeader.startsWith("Bearer")) {
            //looking good
            token = requestHeader.substring(7);
            try {

                username = this.jwtHelper.getUsernameFromToken(token);

            } catch (IllegalArgumentException e) {
                logger.info("Illegal Argument while fetching the username !!");
                e.printStackTrace();
            } catch (ExpiredJwtException e) {
                logger.info("Given jwt token is expired !!");
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("message", "JWT Token has expired!!");
                response.setContentType("application/json");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(errorResponse));


                return;
               // e.printStackTrace();
            } catch (MalformedJwtException e) {
                logger.info("Some changed has done in token !! Invalid Token");
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();

            }


        } else {
            logger.info("Invalid Header Value !! ");
        }


        //
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {


            //fetch user detail from username
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            Boolean validateToken = this.jwtHelper.validateToken(token, userDetails);
            if (validateToken) {

                //set the authentication
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);


            } else {
                logger.info("Validation fails !!");
            }


        }

        filterChain.doFilter(request, response);


    }
}


