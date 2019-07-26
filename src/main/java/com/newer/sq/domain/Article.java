package com.newer.sq.domain;

import java.util.Date;

public class Article {
   private Integer Artid;//系统自动编码
   private Integer Uid ;//	用户id
   private Integer Artstatus;//状态（0-正常1-已删除）
   private String Artitle;//文章标题
   private String Arttext;//文章内容
   private String Arttag;//文章标签
   private String ArtphotoPath;//图片路径
   private String Musicid;//音乐id
   private Date ArtDate;//发布时间

    public Article() {
    }

    public Article(Integer artid, Integer uid, Integer artstatus, String artitle, String arttext, String arttag, String artphotoPath, String musicid, Date artDate) {
        Artid = artid;
        Uid = uid;
        Artstatus = artstatus;
        Artitle = artitle;
        Arttext = arttext;
        Arttag = arttag;
        ArtphotoPath = artphotoPath;
        Musicid = musicid;
        ArtDate = artDate;
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

    public String getArtitle() {
        return Artitle;
    }

    public void setArtitle(String artitle) {
        Artitle = artitle;
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

    public String getMusicid() {
        return Musicid;
    }

    public void setMusicid(String musicid) {
        Musicid = musicid;
    }

    public Date getArtDate() {
        return ArtDate;
    }

    public void setArtDate(Date artDate) {
        ArtDate = artDate;
    }

    @Override
    public String toString() {
        return "Article{" +
                "Artid=" + Artid +
                ", Uid=" + Uid +
                ", Artstatus=" + Artstatus +
                ", Artitle='" + Artitle + '\'' +
                ", Arttext='" + Arttext + '\'' +
                ", Arttag='" + Arttag + '\'' +
                ", ArtphotoPath='" + ArtphotoPath + '\'' +
                ", Musicid='" + Musicid + '\'' +
                ", ArtDate=" + ArtDate +
                '}';
    }
}
