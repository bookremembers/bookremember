package com.newer.sq.service;


import com.newer.sq.domain.Menu;
import com.newer.sq.mapper.MenuMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {
    @Autowired
    private MenuMapper menuMapper;

    /**
     * 查询用户下所有的菜单
     * @param id
     * @return
     */
    public List<Integer> loadMenuByUser(Integer id){
        return menuMapper.loadMenuByUser(id);
    }

    /**
     * 查询一级菜单
     * @return
     */
    public List<Menu> loadTopMenu(){
        return menuMapper.loadTopMenu();
    }

    /**
     * 查询二级菜单
     * @param pid
     * @return
     */
    public List<Menu> loadChildMenu(Integer pid){
        return menuMapper.loadChildMenu(pid);
    }

}
