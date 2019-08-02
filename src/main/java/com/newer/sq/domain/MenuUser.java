package com.newer.sq.domain;

import java.io.Serializable;
import java.util.List;

public class MenuUser implements Serializable {

    private Menu topMenu;           // 一级菜单
    private List<Menu> childMenu;   //二级菜单

    public MenuUser() {
    }

    public MenuUser(Menu topMenu, List<Menu> childMenu) {
        this.topMenu = topMenu;
        this.childMenu = childMenu;
    }

    public Menu getTopMenu() {
        return topMenu;
    }

    public void setTopMenu(Menu topMenu) {
        this.topMenu = topMenu;
    }

    public List<Menu> getChildMenu() {
        return childMenu;
    }

    public void setChildMenu(List<Menu> childMenu) {
        this.childMenu = childMenu;
    }

    @Override
    public String toString() {
        return "MenuUser{" +
                "topMenu=" + topMenu +
                ", childMenu=" + childMenu +
                '}';
    }
}
