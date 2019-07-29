package com.newer.sq.domain;

import java.io.Serializable;

public class Address implements Serializable {

    private Integer addressid;
    private Integer uid;
    private String provinceid;
    private String cityid;
    private String areaid;
    private String aname;
    private String amore;
    private Integer code;
    private String phone;
    private Integer atype;
    private String provinceName;
    private String cityName;
    private String areaName;

    public Address() {
    }

    public Address(Integer addressid, Integer uid, String provinceid, String cityid, String areaid, String aname, String amore, Integer code, String phone, Integer atype, String provinceName, String cityName, String areaName) {
        this.addressid = addressid;
        this.uid = uid;
        this.provinceid = provinceid;
        this.cityid = cityid;
        this.areaid = areaid;
        this.aname = aname;
        this.amore = amore;
        this.code = code;
        this.phone = phone;
        this.atype = atype;
        this.provinceName = provinceName;
        this.cityName = cityName;
        this.areaName = areaName;
    }

    public Address(Integer uid, String provinceid, String cityid, String areaid, String aname, String amore, Integer code, String phone) {
        this.uid = uid;
        this.provinceid = provinceid;
        this.cityid = cityid;
        this.areaid = areaid;
        this.aname = aname;
        this.amore = amore;
        this.code = code;
        this.phone = phone;
    }

    public Address(String provinceid, String cityid, String areaid) {
        this.provinceid = provinceid;
        this.cityid = cityid;
        this.areaid = areaid;
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

    public String getProvinceid() {
        return provinceid;
    }

    public void setProvinceid(String provinceid) {
        this.provinceid = provinceid;
    }

    public String getCityid() {
        return cityid;
    }

    public void setCityid(String cityid) {
        this.cityid = cityid;
    }

    public String getAreaid() {
        return areaid;
    }

    public void setAreaid(String areaid) {
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

    public Integer getAtype() {
        return atype;
    }

    public void setAtype(Integer atype) {
        this.atype = atype;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
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
