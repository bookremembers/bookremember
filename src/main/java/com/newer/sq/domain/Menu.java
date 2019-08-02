package com.newer.sq.domain;

import java.io.Serializable;

public class Menu implements Serializable {
    private Integer id;
    private Integer parentId;
    private Integer seq;
    private String name;
    private String descn;
    private String linkUrl;
    private String status;

    public Menu() {}

    public Menu(Integer id, Integer parentId, Integer seq, String name, String descn, String linkUrl, String status) {
        this.id = id;
        this.parentId = parentId;
        this.seq = seq;
        this.name = name;
        this.descn = descn;
        this.linkUrl = linkUrl;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Integer getSeq() {
        return seq;
    }

    public void setSeq(Integer seq) {
        this.seq = seq;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescn() {
        return descn;
    }

    public void setDescn(String descn) {
        this.descn = descn;
    }

    public String getLinkUrl() {
        return linkUrl;
    }

    public void setLinkUrl(String linkUrl) {
        this.linkUrl = linkUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "id=" + id +
                ", parentId=" + parentId +
                ", seq=" + seq +
                ", name='" + name + '\'' +
                ", descn='" + descn + '\'' +
                ", linkUrl='" + linkUrl + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
