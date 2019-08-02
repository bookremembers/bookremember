package com.newer.sq.controller;


import com.newer.sq.domain.Menu;
import com.newer.sq.domain.MenuUser;
import com.newer.sq.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MenuController {
    @Autowired
    private MenuService menuService;

    @RequestMapping("loadMenu")
    @ResponseBody
    public List<MenuUser> loadMenu(@RequestParam("id") Integer id){
        List<MenuUser> menuUserList=new ArrayList<>();
        //1234
        //1.根据用户id查询该用户的所有菜单
        List<Integer> menuIdList=menuService.loadMenuByUser(id);
        //2.查询所有的一级菜单
        List<Menu> topMenuList=menuService.loadTopMenu();
        //3.for循环所有的一级菜单
        for (Menu topMenu:topMenuList){
            MenuUser menuUser=new MenuUser();
            //判断该用户对一级菜单是否有权限
            if (menuIdList.contains((topMenu.getId()))){    //1
                menuUser.setTopMenu(topMenu);//设置一级菜单
                //根据一级查二级
                List<Menu> childMenuList=menuService.loadChildMenu(topMenu.getId());//234
                //存放二级菜单
                List<Menu> realMenuList=new ArrayList<>();
                for (Menu childMenu:childMenuList){
                    if (menuIdList.contains(childMenu.getId())){
                        realMenuList.add(childMenu);
                    }
                }
                menuUser.setChildMenu(realMenuList);//设置二级菜单
                menuUserList.add(menuUser);
            }
        }
        return menuUserList;
    }
}
