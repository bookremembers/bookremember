package com.newer.sq.domain;

import java.io.Serializable;

public class Tag implements Serializable {
    private Integer tagid;
    private String Tagname;

    public Integer getTagid() {
        return tagid;
    }

    public void setTagid(Integer tagid) {
        this.tagid = tagid;
    }

    public String getTagname() {
        return Tagname;
    }

    public void setTagname(String tagname) {
        Tagname = tagname;
    }
}
