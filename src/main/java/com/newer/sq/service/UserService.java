package com.newer.sq.service;

import com.newer.sq.domain.User;
import com.newer.sq.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public int regUser(String username,String password,String phone){
        return userMapper.regUser(username,password,phone);

    }

    public User queryByUsernamePwd(String username,String password){
        return userMapper.queryByUsernamePwd(username,password);
    }

    /*获取验证码*/
    public User getCode(String username,String phone){
        return userMapper.getCode(username, phone);
    }

    /*通过用户id修改密码*/
    public Integer updPwdById(Integer uid,String newpwd){
        return userMapper.updPwdById(uid, newpwd);
    }

    /*根据用户id修改用户名*/
    public Integer updNameById(Integer uid,String newName){
        return userMapper.updNameById(uid, newName);
    }

    /*根据用户查询uid*/
    public User selectById(Integer uid){
        return userMapper.selectById(uid);
    }
}
