package com.newer.sq.domain;

import java.io.Serializable;
import java.util.Date;

public class User implements Serializable {
    private static final long serialVersionUID = -7756421624061415332L;
    private Integer uid;
    private Integer Menberid;
    private Integer Type;
    private String username;
    private String password;
    private Integer Total;
    private String photoPath;
    private String phone;
    private Date regdate;

    public User() {
    }

    public User(Integer uid, Integer menberid, Integer type, String username, String password, Integer total, String photoPath, String phone, Date regdate) {
        this.uid = uid;
        Menberid = menberid;
        Type = type;
        this.username = username;
        this.password = password;
        Total = total;
        this.photoPath = photoPath;
        this.phone = phone;
        this.regdate = regdate;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getMenberid() {
        return Menberid;
    }

    public void setMenberid(Integer menberid) {
        Menberid = menberid;
    }

    public Integer getType() {
        return Type;
    }

    public void setType(Integer type) {
        Type = type;
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

    public Integer getTotal() {
        return Total;
    }

    public void setTotal(Integer total) {
        Total = total;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getRegdate() {
        return regdate;
    }

    public void setRegdate(Date regdate) {
        this.regdate = regdate;
    }

    @Override
    public String toString() {
        return "User{" +
                "uid=" + uid +
                ", Menberid=" + Menberid +
                ", Type=" + Type +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", Total=" + Total +
                ", photoPath='" + photoPath + '\'' +
                ", phone='" + phone + '\'' +
                ", regdate=" + regdate +
                '}';
    }
}
