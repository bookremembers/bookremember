package com.newer.sq.domain;

import java.io.Serializable;

public class Area implements Serializable {
    private static final long serialVersionUID = -8475348070877195780L;
    private Integer areaId;
    private String areaCode;
    private String areaName;
    private String cityCode;

    public Area() {
    }

    public Area(Integer areaId, String areaCode, String areaName, String cityCode) {
        this.areaId = areaId;
        this.areaCode = areaCode;
        this.areaName = areaName;
        this.cityCode = cityCode;
    }

    public Integer getAreaId() {
        return areaId;
    }

    public void setAreaId(Integer areaId) {
        this.areaId = areaId;
    }

    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }
}
