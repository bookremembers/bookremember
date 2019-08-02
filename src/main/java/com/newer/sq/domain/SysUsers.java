package com.newer.sq.domain;

import java.io.Serializable;
import java.util.Date;

public class SysUsers implements Serializable {

    private Integer id;
    private String username;
    private String password;
    private Integer usertype;
    private String userstatus;
    private Date regtime;
    private Integer state;

    public SysUsers() {
    }

    public SysUsers(Integer id, String username, String password, Integer usertype, String userstatus, Date regtime, Integer state) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.usertype = usertype;
        this.userstatus = userstatus;
        this.regtime = regtime;
        this.state = state;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getUsertype() {
        return usertype;
    }

    public void setUsertype(Integer usertype) {
        this.usertype = usertype;
    }

    public String getUserstatus() {
        return userstatus;
    }

    public void setUserstatus(String userstatus) {
        this.userstatus = userstatus;
    }

    public Date getRegtime() {
        return regtime;
    }

    public void setRegtime(Date regtime) {
        this.regtime = regtime;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "SysUsers{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", usertype=" + usertype +
                ", userstatus='" + userstatus + '\'' +
                ", regtime=" + regtime +
                ", state=" + state +
                '}';
    }
}
