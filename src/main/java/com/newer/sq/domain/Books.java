package com.newer.sq.domain;

import org.apache.ibatis.annotations.Insert;

import java.io.PrintWriter;
import java.io.Serializable;
import java.util.Date;

public class Books implements Serializable {

    private Integer bid;
    private Integer uid;
    private Integer artid;
    private String bname;
    private String bookurl;
    private Double bprice;
    private Integer bpage;
    private String bsize;
    private String bway;
    private Integer bnumber;
    private Date bdate;
    private Integer Artstatus;

    public Books() {
    }

    public Books(Integer bid, Integer uid, Integer artid, String bname, String bookurl, Double bprice, Integer bpage, String bsize, String bway, Integer bnumber, Date bdate,Integer Artstatus) {
        this.bid = bid;
        this.uid = uid;
        this.artid = artid;
        this.bname = bname;
        this.bookurl = bookurl;
        this.bprice = bprice;
        this.bpage = bpage;
        this.bsize = bsize;
        this.bway = bway;
        this.bnumber = bnumber;
        this.bdate = bdate;
        this.Artstatus=Artstatus;
    }

    public Integer getBid() {
        return bid;
    }

    public void setBid(Integer bid) {
        this.bid = bid;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getArtid() {
        return artid;
    }

    public void setArtid(Integer artid) {
        this.artid = artid;
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
        return bprice;
    }

    public void setBprice(Double bprice) {
        this.bprice = bprice;
    }

    public Integer getBpage() {
        return bpage;
    }

    public void setBpage(Integer bpage) {
        this.bpage = bpage;
    }

    public String getBsize() {
        return bsize;
    }

    public void setBsize(String bsize) {
        this.bsize = bsize;
    }

    public String getBway() {
        return bway;
    }

    public void setBway(String bway) {
        this.bway = bway;
    }

    public Integer getBnumber() {
        return bnumber;
    }

    public void setBnumber(Integer bnumber) {
        this.bnumber = bnumber;
    }

    public Date getBdate() {
        return bdate;
    }

    public void setBdate(Date bdate) {
        this.bdate = bdate;
    }

    public Integer getArtstatus() {
        return Artstatus;
    }

    public void setArtstatus(Integer artstatus) {
        Artstatus = artstatus;
    }

    @Override
    public String toString() {
        return "Books{" +
                "bid=" + bid +
                ", uid=" + uid +
                ", artid=" + artid +
                ", bname='" + bname + '\'' +
                ", bookurl='" + bookurl + '\'' +
                ", bprice=" + bprice +
                ", bpage=" + bpage +
                ", bsize='" + bsize + '\'' +
                ", bway='" + bway + '\'' +
                ", bnumber=" + bnumber +
                ", bdate=" + bdate +
                ", Artstatus=" + Artstatus +
                '}';
    }
}
