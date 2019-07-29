package com.newer.sq.domain;

import java.io.Serializable;

public class Province implements Serializable {

    private static final long serialVersionUID = 6706827783855453103L;
    private Integer provinceId;
    private String provinceCode;
    private String provinceName;
    private String shortName;
    private Integer sort;

    public Province() {
    }

    public Province(Integer provinceId, String provinceCode, String provinceName, String shortName, Integer sort) {
        this.provinceId = provinceId;
        this.provinceCode = provinceCode;
        this.provinceName = provinceName;
        this.shortName = shortName;
        this.sort = sort;
    }

    public Integer getProvinceId() {
        return provinceId;
    }

    public void setProvinceId(Integer provinceId) {
        this.provinceId = provinceId;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    @Override
    public String toString() {
        return "Province{" +
                "provinceId=" + provinceId +
                ", provinceCode='" + provinceCode + '\'' +
                ", provinceName='" + provinceName + '\'' +
                ", shortName='" + shortName + '\'' +
                ", sort=" + sort +
                '}';
    }
}
