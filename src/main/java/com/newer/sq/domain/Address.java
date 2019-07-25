package com.newer.sq.domain;

import java.io.Serializable;

public class Address implements Serializable {
    private Integer addressid;
    private Integer uid;
    private Integer provinceid;
    private Integer cityid;
    private Integer areaid;
    private String aname;
    private String amore;
    private Integer code;
    private String phone;

    public Address() {
    }

    public Address(Integer addressid, Integer uid, Integer provinceid, Integer cityid, Integer areaid, String aname, String amore, Integer code, String phone) {
        this.addressid = addressid;
        this.uid = uid;
        this.provinceid = provinceid;
        this.cityid = cityid;
        this.areaid = areaid;
        this.aname = aname;
        this.amore = amore;
        this.code = code;
        this.phone = phone;
    }

    public Integer getAddressid() {
        return addressid;
    }

    public void setAddressid(Integer addressid) {
        this.addressid = addressid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getProvinceid() {
        return provinceid;
    }

    public void setProvinceid(Integer provinceid) {
        this.provinceid = provinceid;
    }

    public Integer getCityid() {
        return cityid;
    }

    public void setCityid(Integer cityid) {
        this.cityid = cityid;
    }

    public Integer getAreaid() {
        return areaid;
    }

    public void setAreaid(Integer areaid) {
        this.areaid = areaid;
    }

    public String getAname() {
        return aname;
    }

    public void setAname(String aname) {
        this.aname = aname;
    }

    public String getAmore() {
        return amore;
    }

    public void setAmore(String amore) {
        this.amore = amore;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "Address{" +
                "addressid=" + addressid +
                ", uid=" + uid +
                ", provinceid=" + provinceid +
                ", cityid=" + cityid +
                ", areaid=" + areaid +
                ", aname='" + aname + '\'' +
                ", amore='" + amore + '\'' +
                ", code=" + code +
                ", phone='" + phone + '\'' +
                '}';
    }
}
