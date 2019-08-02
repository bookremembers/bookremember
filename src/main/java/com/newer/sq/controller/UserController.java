package com.newer.sq.controller;

import com.newer.sq.domain.Integral;
import com.newer.sq.domain.SysUsers;
import com.newer.sq.domain.User;
import com.newer.sq.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
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

    /*登录成功，把登录用户存到session中*/
    @RequestMapping("queryByUsernamePwd")
    public User queryByUsernamePwd(@RequestParam("username") String username, @RequestParam("password") String password,HttpSession session) {
        User user = userService.queryByUsernamePwd(username, password);
        session.setAttribute("loginUser",user);
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
                    session.setAttribute("user",user);
                }
            }
        }
        Map<String,String> map=new HashMap<>();
        map.put("flag",flag);
        return new ResponseEntity<>(map,HttpStatus.OK);
    }

    /*通过用户id修改密码*/
    @RequestMapping("updPwdById")
    public Integer updPwdById(@RequestParam("newPwd") String newPwd,HttpSession session){
        User user=(User) session.getAttribute("user");

        return userService.updPwdById(user.getUid(),newPwd);
    }

    /*session拿到登录用户对象返回页面*/
    @RequestMapping("queryLoginUser")
    public ResponseEntity<?> queryLoginUser(HttpSession session){
        User loginUser=(User) session.getAttribute("loginUser");
        /*修改信息后用户拿到的信息*/
        User user=userService.selectById(loginUser.getUid());
        session.setAttribute("loginUser",user);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    /*根据id修改用户名*/
    @RequestMapping("updName")
    public int updName(@RequestParam("newName")String newName,@RequestParam("uid") Integer uid){
        System.out.println(newName+"---"+uid);
        return userService.updNameById(uid,newName);
    }

    @RequestMapping("selectUserById")
    public User selectById(@RequestParam("uid") int uid){
        return userService.selectById(uid);
    }

    @RequestMapping("updateTotalById")
    public int updateTotalById(@RequestParam("total")int total,@RequestParam("uid")int uid){
    return userService.updateTotalById(total,uid);
    }

    @RequestMapping("queryAllIntegral")
    public List<Integral> queryAllIntegral(@RequestParam("uid")int uid){
        return userService.queryAllIntegral(uid);
    }

    @RequestMapping("sysuser")
    public SysUsers sysUsers(@RequestParam("username")String username,@RequestParam("password")String password,HttpSession session){
         SysUsers sysuser = userService.sysuser(username,password);
         if (sysuser!=null){
             session.setAttribute("sysuser",sysuser);
         }
         return  sysuser;
    }

    @RequestMapping("getUserInfo")
    @ResponseBody
    public SysUsers getUserInfo(HttpSession session){
        SysUsers users=(SysUsers) session.getAttribute("sysuser");
        if (users!=null){
            //讲密码设置为空
            users.setPassword(null);
        }
        return users;
    }
}
