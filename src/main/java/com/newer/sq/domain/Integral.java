package com.newer.sq.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class Integral implements Serializable {

    private int integralid;
    private int uid;
    private String resource;
    private int integral;
    @DateTimeFormat(pattern = "yyyy-MM-dd hh-mm-ss")
    @JsonFormat(pattern = "yyyy-MM-dd hh-mm-ss",timezone = "GMT+8")
    private Date integralTime;

    public Integral() {
    }

    public Integral(int integralid, int uid, String resource, int integral, Date integralTime) {
        this.integralid = integralid;
        this.uid = uid;
        this.resource = resource;
        this.integral = integral;
        this.integralTime = integralTime;
    }

    public int getIntegralid() {
        return integralid;
    }

    public void setIntegralid(int integralid) {
        this.integralid = integralid;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

    public int getIntegral() {
        return integral;
    }

    public void setIntegral(int integral) {
        this.integral = integral;
    }

    public Date getIntegralTime() {
        return integralTime;
    }

    public void setIntegralTime(Date integralTime) {
        this.integralTime = integralTime;
    }

    @Override
    public String toString() {
        return "Integral{" +
                "integralid=" + integralid +
                ", uid=" + uid +
                ", resource='" + resource + '\'' +
                ", integral=" + integral +
                ", integralTime=" + integralTime +
                '}';
    }
}
