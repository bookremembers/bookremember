package com.newer.sq.controller;

import com.newer.sq.domain.User;
import com.newer.sq.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("regUser")
    public int regUser(@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("phone") String phone) {
        User user = userService.queryByUsernamePwd(username, password);
        User getUser = userService.getCode(username, phone);
        int count = 0;
        if (user == null && getUser == null) {
            count = userService.regUser(username, password, phone);
        }
        return count;
    }

    @RequestMapping("queryByUsernamePwd")
    public User queryByUsernamePwd(@RequestParam("username") String username, @RequestParam("password") String password) {
        User user = userService.queryByUsernamePwd(username, password);
        return user;
    }

    /*获取验证码*/
    @RequestMapping("getCode")
    public ResponseEntity<?> getCode(@RequestParam("username") String username, @RequestParam("phone") String phone, HttpSession session) {
        /*随机一个验证码发送到前端*/
        String codeNum = "";
            int[] numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
            Random random = new Random();
            for (int i = 0; i < 6; i++) {
                int next = random.nextInt(10000);//目的是产生足够随机的数，避免产生的数字重复率高的问题
                codeNum += numbers[next % 10];
            }
            System.out.println(codeNum);
        session.setAttribute("codeNum",codeNum);
        return new ResponseEntity<>(codeNum, HttpStatus.OK);
    }

    /*验证验证码*/
    @RequestMapping("submitCode")
    public ResponseEntity<?> submitCode(@RequestParam("username") String username, @RequestParam("phone") String phone, @RequestParam("code") String code,HttpSession session) {
        User user=userService.getCode(username, phone);
        String flag="";
        if (code==null || code==""){
            flag="验证码不能为空";
        }else {
            if (user==null){
                flag="没有该用户";
            }else{
                String codeNum=(String) session.getAttribute("codeNum");
                if (!code.equals(codeNum)){
                    flag="验证码错误";
                }else {
                    flag="1";
                }
            }
        }
        Map<String,String> map=new HashMap<>();
        map.put("flag",flag);
        return new ResponseEntity<>(map,HttpStatus.OK);
    }
}
