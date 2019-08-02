package com.newer.sq.service;

import com.newer.sq.domain.Integral;
import com.newer.sq.domain.SysUsers;
import com.newer.sq.domain.User;
import com.newer.sq.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public int regUser(String username, String password, String phone) {
        return userMapper.regUser(username, password, phone);
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public User queryByUsernamePwd(String username, String password) {
        return userMapper.queryByUsernamePwd(username, password);
    }

    /*获取验证码*/
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public User getCode(String username, String phone) {
        return userMapper.getCode(username, phone);
    }

    /*通过用户id修改密码*/
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public Integer updPwdById(Integer uid, String newpwd) {
        return userMapper.updPwdById(uid, newpwd);
    }

    /*根据用户id修改用户名*/
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public Integer updNameById(Integer uid, String newName) {
        return userMapper.updNameById(uid, newName);
    }

    /*根据用户查询uid*/
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public User selectById(Integer uid) {
        return userMapper.selectById(uid);
    }

    //根据UID 修改用户积分
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public int updateTotalById(int total,int uid){
        return userMapper.updateTotalById(total,uid);
    }

    public List<Integral> queryAllIntegral(int uid){
        return userMapper.queryAllIntegral(uid);
    }

    //后台登录
    public SysUsers sysuser(String username,String password){
        return userMapper.sysuser(username,password);
    }
}
