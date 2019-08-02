package com.newer.sq.mapper;

import com.newer.sq.domain.Menu;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface MenuMapper {
    //查询该用户下所有的菜单
    @Select("select distinct mr.menu_id from sys_roles r,sys_user_role ur," +
            " sys_menu_role mr where r.id=ur.role_id and r.id=mr.role_id" +
            " and ur.user_id=#{id}")
    public List<Integer> loadMenuByUser(@Param("id") Integer id);

    //查询所有一级菜单
    @Select("select * from sys_menus where parent_id is null order by seq")
    @Results({
            @Result(property = "parentId",column = "parent_id"),
            @Result(property = "linkUrl", column = "LINK_URL")
    })
    public List<Menu> loadTopMenu();

    //查询所有二级菜单
    @Select("select * from sys_menus where parent_id=#{pid} order by seq")
    @Results({
            @Result(property = "parentId",column = "parent_id"),
            @Result(property = "linkUrl", column = "LINK_URL")
    })
    public List<Menu> loadChildMenu(@Param("pid") Integer pid);
}
