package com.newer.sq.controller;

import com.newer.sq.domain.User;
import com.newer.sq.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("regUser")
    public int regUser(@RequestParam("username")String username,@RequestParam("password")String password,@RequestParam("phone")String phone){
        int count = userService.regUser(username,password,phone);
        return count;
    }

    @RequestMapping("queryByUsernamePwd")
    public User queryByUsernamePwd(@RequestParam("username")String username,@RequestParam("password")String password){
        User user = userService.queryByUsernamePwd(username,password);
        return user;
    }
}
