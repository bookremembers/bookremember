package com.newer.sq.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class Article implements Serializable {

    private Integer Artid;
    private Integer Uid;
    private Integer Artstatus;
    private Integer Atype;
    private String Arttitle;
    private String Arttext;
    private String Arttag;
    private String ArtphotoPath;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd",timezone = "GMT+8")
    private Date ArtDate;
    private Integer bid;
    private Date deleteTime;

    public Article() {
    }

    public Article(Integer artid, Integer uid, Integer artstatus, Integer atype, String arttitle, String arttext, String arttag, String artphotoPath, Date artDate, Integer bid, Date deleteTime) {
        Artid = artid;
        Uid = uid;
        Artstatus = artstatus;
        Atype = atype;
        Arttitle = arttitle;
        Arttext = arttext;
        Arttag = arttag;
        ArtphotoPath = artphotoPath;
        ArtDate = artDate;
        this.bid = bid;
        this.deleteTime = deleteTime;
    }

    public Integer getArtid() {
        return Artid;
    }

    public void setArtid(Integer artid) {
        Artid = artid;
    }

    public Integer getUid() {
        return Uid;
    }

    public void setUid(Integer uid) {
        Uid = uid;
    }

    public Integer getArtstatus() {
        return Artstatus;
    }

    public void setArtstatus(Integer artstatus) {
        Artstatus = artstatus;
    }

    public Integer getAtype() {
        return Atype;
    }

    public void setAtype(Integer atype) {
        Atype = atype;
    }

    public String getArttitle() {
        return Arttitle;
    }

    public void setArttitle(String arttitle) {
        Arttitle = arttitle;
    }

    public String getArttext() {
        return Arttext;
    }

    public void setArttext(String arttext) {
        Arttext = arttext;
    }

    public String getArttag() {
        return Arttag;
    }

    public void setArttag(String arttag) {
        Arttag = arttag;
    }

    public String getArtphotoPath() {
        return ArtphotoPath;
    }

    public void setArtphotoPath(String artphotoPath) {
        ArtphotoPath = artphotoPath;
    }

    public Date getArtDate() {
        return ArtDate;
    }

    public void setArtDate(Date artDate) {
        ArtDate = artDate;
    }

    public Integer getBid() {
        return bid;
    }

    public void setBid(Integer bid) {
        this.bid = bid;
    }

    public Date getDeleteTime() {
        return deleteTime;
    }

    public void setDeleteTime(Date deleteTime) {
        this.deleteTime = deleteTime;
    }

    @Override
    public String toString() {
        return "Article{" +
                "Artid=" + Artid +
                ", Uid=" + Uid +
                ", Artstatus=" + Artstatus +
                ", Atype=" + Atype +
                ", Arttitle='" + Arttitle + '\'' +
                ", Arttext='" + Arttext + '\'' +
                ", Arttag='" + Arttag + '\'' +
                ", ArtphotoPath='" + ArtphotoPath + '\'' +
                ", ArtDate=" + ArtDate +
                ", bid=" + bid +
                ", deleteTime=" + deleteTime +
                '}';
    }
}
