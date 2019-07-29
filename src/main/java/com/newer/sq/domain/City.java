package com.newer.sq.domain;

import java.io.Serializable;

public class City implements Serializable {

    private static final long serialVersionUID = 6398886745938938063L;
    private Integer cityId;
    private String cityCode;
    private String cityName;
    private String provinceCode;

    public City() {
    }

    public City(Integer cityId, String cityCode, String cityName, String provinceCode) {
        this.cityId = cityId;
        this.cityCode = cityCode;
        this.cityName = cityName;
        this.provinceCode = provinceCode;
    }

    public Integer getCityId() {
        return cityId;
    }

    public void setCityId(Integer cityId) {
        this.cityId = cityId;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }
}
