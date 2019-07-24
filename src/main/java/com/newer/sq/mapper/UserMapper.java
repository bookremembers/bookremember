package com.newer.sq.mapper;

import com.newer.sq.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface UserMapper {
    //注册
    @Insert("insert into sq_user values(null,1,1,0,#{username},#{password},0,null,#{phone},now())")
    public int regUser(@Param("username")String username,@Param("password")String password,@Param("phone")String phone);
//登录
    @Select("select * from sq_user where username = #{username} and password = #{password}")
    public User queryByUsernamePwd(@Param("username")String username,@Param("password") String password);

}