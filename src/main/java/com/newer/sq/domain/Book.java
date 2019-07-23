package com.newer.sq.domain;

import java.io.Serializable;

public class Book implements Serializable {
    private Integer pid;
    private String pname;
    private String introduce;
    private String Imga;
    private String Imgb;
    private String Imgc;
    private String Imgd;
    private String Imge;
    private String Imgf;
    private String Imgg;
    private String Imgh;
    private String psize;
    private String videourl;
    private String bookimg;

    public Book() {
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce;
    }

    public String getImga() {
        return Imga;
    }

    public void setImga(String imga) {
        Imga = imga;
    }

    public String getImgb() {
        return Imgb;
    }

    public void setImgb(String imgb) {
        Imgb = imgb;
    }

    public String getImgc() {
        return Imgc;
    }

    public void setImgc(String imgc) {
        Imgc = imgc;
    }

    public String getImgd() {
        return Imgd;
    }

    public void setImgd(String imgd) {
        Imgd = imgd;
    }

    public String getImge() {
        return Imge;
    }

    public void setImge(String imge) {
        Imge = imge;
    }

    public String getImgf() {
        return Imgf;
    }

    public void setImgf(String imgf) {
        Imgf = imgf;
    }

    public String getImgg() {
        return Imgg;
    }

    public void setImgg(String imgg) {
        Imgg = imgg;
    }

    public String getImgh() {
        return Imgh;
    }

    public void setImgh(String imgh) {
        Imgh = imgh;
    }

    public String getPsize() {
        return psize;
    }

    public void setPsize(String psize) {
        this.psize = psize;
    }

    public String getVideourl() {
        return videourl;
    }

    public void setVideourl(String videourl) {
        this.videourl = videourl;
    }

    public String getBookimg() {
        return bookimg;
    }

    public void setBookimg(String bookimg) {
        this.bookimg = bookimg;
    }

    @Override
    public String toString() {
        return "Book{" +
                "pid=" + pid +
                ", pname='" + pname + '\'' +
                ", introduce='" + introduce + '\'' +
                ", Imga='" + Imga + '\'' +
                ", Imgb='" + Imgb + '\'' +
                ", Imgc='" + Imgc + '\'' +
                ", Imgd='" + Imgd + '\'' +
                ", Imge='" + Imge + '\'' +
                ", Imgf='" + Imgf + '\'' +
                ", Imgg='" + Imgg + '\'' +
                ", Imgh='" + Imgh + '\'' +
                ", psize='" + psize + '\'' +
                ", videourl='" + videourl + '\'' +
                ", bookimg='" + bookimg + '\'' +
                '}';
    }
}
