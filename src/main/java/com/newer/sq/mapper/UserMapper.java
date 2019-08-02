package com.newer.sq.mapper;

import com.newer.sq.domain.Integral;
import com.newer.sq.domain.SysUsers;
import com.newer.sq.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserMapper {
    //注册
    @Insert("insert into sq_user values(null,1,0,#{username},#{password},0,null,#{phone},now())")
    public int regUser(@Param("username") String username, @Param("password") String password, @Param("phone") String phone);

    //登录
    @Select("select * from sq_user where username = #{username} and password = #{password}")
    public User queryByUsernamePwd(@Param("username") String username, @Param("password") String password);

    /*获取验证码  通过手机号和用户名查询是否有此人*/
    @Select("select * from sq_user where username=#{username} and phone=#{phone}")
    public User getCode(@Param("username") String username, @Param("phone") String phone);

    /*根据用户名修改密码*/
    @Update("update sq_user set password=#{newPwd} where uid=#{uid}")
    public Integer updPwdById(@Param("uid") Integer uid, @Param("newPwd") String newPwd);

    /*根据用户id修改用户名*/
    @Update("update sq_user set username=#{newName} where uid=#{uid}")
    public Integer updNameById(@Param("uid") Integer uid,@Param("newName") String newName);

    /*根据id查询用户*/
    @Select("select * from sq_user where uid=#{uid}")
    public User selectById(@Param("uid") Integer uid);

    //根据UID修改用户积分
    @Update("update sq_user set total = total - #{total} where uid = #{uid}")
    public int updateTotalById(@Param("total")int total,@Param("uid")int uid);

    //根据uid查询积分信息
    @Select("select * from sq_integral where uid = #{uid}")
    public List<Integral> queryAllIntegral(@Param("uid")int uid);

    //后台登录
    @Select("select * from sys_users where username=#{username} and password=#{password}")
    public SysUsers sysuser(@Param("username") String username,@Param("password") String password);



}

