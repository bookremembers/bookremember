package com.newer.sq.domain;

import java.util.Date;

public class Sqrecycle  {

  private Integer  Rid	;//系统自动编码
  private Integer  Uid	;//用户id
  private Integer  Artid;//文章id
   private Integer Bid	;//书籍id
  private  String  Artag;//文章标签
   private String ArtphotoPath;//图片路径
   private String Artmusic	;//音乐
   private Date Artdate	;//发布时间
    private String Artconten;//文章内容
    private Date Artdeledata;//删除时间
    public Sqrecycle() {
    }

    public Sqrecycle(Integer rid, Integer uid, Integer artid, Integer bid, String artag, String artphotoPath, String artmusic, Date artdate, String artconten, Date artdeledata) {
        Rid = rid;
        Uid = uid;
        Artid = artid;
        Bid = bid;
        Artag = artag;
        ArtphotoPath = artphotoPath;
        Artmusic = artmusic;
        Artdate = artdate;
        Artconten = artconten;
        Artdeledata = artdeledata;
    }

    public Integer getRid() {
        return Rid;
    }

    public void setRid(Integer rid) {
        Rid = rid;
    }

    public Integer getUid() {
        return Uid;
    }

    public void setUid(Integer uid) {
        Uid = uid;
    }

    public Integer getArtid() {
        return Artid;
    }

    public void setArtid(Integer artid) {
        Artid = artid;
    }

    public Integer getBid() {
        return Bid;
    }

    public void setBid(Integer bid) {
        Bid = bid;
    }

    public String getArtag() {
        return Artag;
    }

    public void setArtag(String artag) {
        Artag = artag;
    }

    public String getArtphotoPath() {
        return ArtphotoPath;
    }

    public void setArtphotoPath(String artphotoPath) {
        ArtphotoPath = artphotoPath;
    }

    public String getArtmusic() {
        return Artmusic;
    }

    public void setArtmusic(String artmusic) {
        Artmusic = artmusic;
    }

    public Date getArtdate() {
        return Artdate;
    }

    public void setArtdate(Date artdate) {
        Artdate = artdate;
    }

    public String getArtconten() {
        return Artconten;
    }

    public void setArtconten(String artconten) {
        Artconten = artconten;
    }

    public Date getArtdeledata() {
        return Artdeledata;
    }

    public void setArtdeledata(Date artdeledata) {
        Artdeledata = artdeledata;
    }

    @Override
    public String toString() {
        return "Sqrecycle{" +
                "Rid=" + Rid +
                ", Uid=" + Uid +
                ", Artid=" + Artid +
                ", Bid=" + Bid +
                ", Artag='" + Artag + '\'' +
                ", ArtphotoPath='" + ArtphotoPath + '\'' +
                ", Artmusic='" + Artmusic + '\'' +
                ", Artdate=" + Artdate +
                ", Artconten='" + Artconten + '\'' +
                ", Artdeledata=" + Artdeledata +
                '}';
    }
}
