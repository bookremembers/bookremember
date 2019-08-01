package com.newer.sq.domain;

import java.io.Serializable;
import java.util.Date;

public class Photo implements Serializable {
    private static final long serialVersionUID = 903044132701241262L;
    private Integer photoid;
    private String imga;
    private String imgb;
    private String imgc;
    private String imgd;
    private String imge;
    private String context;
    private Integer bid;
    private Date photoTime;

    public Photo(Integer photoid, String imga, String imgb, String imgc, String imgd, String imge, String context, Integer bid, Date photoTime) {
        this.photoid = photoid;
        this.imga = imga;
        this.imgb = imgb;
        this.imgc = imgc;
        this.imgd = imgd;
        this.imge = imge;
        this.context = context;
        this.bid = bid;
        this.photoTime = photoTime;
    }

    public Photo( String imga, String imgb, String imgc, String imgd, String imge, String context, Integer bid) {
        this.imga = imga;
        this.imgb = imgb;
        this.imgc = imgc;
        this.imgd = imgd;
        this.imge = imge;
        this.context = context;
        this.bid = bid;
    }

    public Photo() {
    }

    public Integer getPhotoid() {
        return photoid;
    }

    public void setPhotoid(Integer photoid) {
        this.photoid = photoid;
    }

    public String getImga() {
        return imga;
    }

    public void setImga(String imga) {
        this.imga = imga;
    }

    public String getImgb() {
        return imgb;
    }

    public void setImgb(String imgb) {
        this.imgb = imgb;
    }

    public String getImgc() {
        return imgc;
    }

    public void setImgc(String imgc) {
        this.imgc = imgc;
    }

    public String getImgd() {
        return imgd;
    }

    public void setImgd(String imgd) {
        this.imgd = imgd;
    }

    public String getImge() {
        return imge;
    }

    public void setImge(String imge) {
        this.imge = imge;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public Integer getBid() {
        return bid;
    }

    public void setBid(Integer bid) {
        this.bid = bid;
    }

    public Date getPhotoTime() {
        return photoTime;
    }

    public void setPhotoTime(Date photoTime) {
        this.photoTime = photoTime;
    }

    @Override
    public String toString() {
        return "Photo{" +
                "photoid=" + photoid +
                ", imga='" + imga + '\'' +
                ", imgb='" + imgb + '\'' +
                ", imgc='" + imgc + '\'' +
                ", imgd='" + imgd + '\'' +
                ", imge='" + imge + '\'' +
                ", context='" + context + '\'' +
                ", bid=" + bid +
                ", photoTime=" + photoTime +
                '}';
    }
}
