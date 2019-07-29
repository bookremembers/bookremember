package com.newer.sq.domain;

import java.io.Serializable;
import java.util.Date;

public class Ordermore implements Serializable {

    private Integer ordid;
    private Integer ordint;
    private Date orderdate;
    private String aname;
    private String amore;
    private String Aphone;
    private String bname;
    private String bookurl;
    private Double Bprice;
    private Integer Bpage;
    private String Bsize;
    private String Bway;
    private String ordstatus;
    private Integer addressid;
    public Ordermore() {
    }

    public Ordermore(Integer ordid, Integer ordint, Date orderdate, String aname, String amore, String aphone, String bname, String bookurl, Double bprice, Integer bpage, String bsize, String bway, String ordstatus, Integer addressid) {
        this.ordid = ordid;
        this.ordint = ordint;
        this.orderdate = orderdate;
        this.aname = aname;
        this.amore = amore;
        Aphone = aphone;
        this.bname = bname;
        this.bookurl = bookurl;
        Bprice = bprice;
        Bpage = bpage;
        Bsize = bsize;
        Bway = bway;
        this.ordstatus = ordstatus;
        this.addressid = addressid;
    }

    public Integer getOrdid() {
        return ordid;
    }

    public void setOrdid(Integer ordid) {
        this.ordid = ordid;
    }

    public Integer getOrdint() {
        return ordint;
    }

    public void setOrdint(Integer ordint) {
        this.ordint = ordint;
    }

    public Date getOrderdate() {
        return orderdate;
    }

    public void setOrderdate(Date orderdate) {
        this.orderdate = orderdate;
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

    public String getAphone() {
        return Aphone;
    }

    public void setAphone(String aphone) {
        Aphone = aphone;
    }

    public String getBname() {
        return bname;
    }

    public void setBname(String bname) {
        this.bname = bname;
    }

    public String getBookurl() {
        return bookurl;
    }

    public void setBookurl(String bookurl) {
        this.bookurl = bookurl;
    }

    public Double getBprice() {
        return Bprice;
    }

    public void setBprice(Double bprice) {
        Bprice = bprice;
    }

    public Integer getBpage() {
        return Bpage;
    }

    public void setBpage(Integer bpage) {
        Bpage = bpage;
    }

    public String getBsize() {
        return Bsize;
    }

    public void setBsize(String bsize) {
        Bsize = bsize;
    }

    public String getBway() {
        return Bway;
    }

    public void setBway(String bway) {
        Bway = bway;
    }

    public String getOrdstatus() {
        return ordstatus;
    }

    public void setOrdstatus(String ordstatus) {
        this.ordstatus = ordstatus;
    }

    public Integer getAddressid() {
        return addressid;
    }

    public void setAddressid(Integer addressid) {
        this.addressid = addressid;
    }

    @Override
    public String toString() {
        return "Ordermore{" +
                "ordid=" + ordid +
                ", ordint=" + ordint +
                ", orderdate=" + orderdate +
                ", aname='" + aname + '\'' +
                ", amore='" + amore + '\'' +
                ", Aphone='" + Aphone + '\'' +
                ", bname='" + bname + '\'' +
                ", bookurl='" + bookurl + '\'' +
                ", Bprice=" + Bprice +
                ", Bpage=" + Bpage +
                ", Bsize='" + Bsize + '\'' +
                ", Bway='" + Bway + '\'' +
                ", ordstatus='" + ordstatus + '\'' +
                ", addressid=" + addressid +
                '}';
    }
}
