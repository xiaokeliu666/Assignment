package com.xliu.controller;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.xliu.pojo.User;
import com.xliu.service.UserService;
import com.xliu.util.JWTUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Map<String,Object> login(@RequestBody User user){
        System.out.println("LOGIN INVOKED...");
        log.info("USERNAME:[{}]",user.getUsername());
        log.info("PASSWORD:[{}]",user.getPassword());
        Map<String,Object> map = new HashMap<>();
        User res = userService.login(user.getUsername(), user.getPassword());
        if(res==null) {
            map.put("status",false);
            map.put("msg","Wrong username or password!");
        } else {
            Map<String,String> payload = new HashMap<>();
            payload.put("username",user.getUsername());
            String token = JWTUtil.getToken(payload);
            System.out.println("登录成功:" + token);
            map.put("status",true);
            map.put("msg","Success!");
            map.put("token",token);
        }
        return map;
    }

    @PostMapping("/test")
    public Map<String,Object> test(HttpServletRequest request) {
        Map<String,Object> map = new HashMap<>();
        String token = request.getHeader("token");
        DecodedJWT verify = JWTUtil.verify(token);
        log.info("USERNAME:[{}]",verify.getClaim("username").asString());
        map.put("status",true);
        map.put("msg","Success!");
        return map;
    }
}
