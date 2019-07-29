package com.newer.sq.mapper;

import com.newer.sq.domain.Area;
import com.newer.sq.domain.City;
import com.newer.sq.domain.Province;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ProvinceMapper {
    /*查询所有省份*/
    @Select("select province_id,province_code,province_name from bs_province")
    @Results({
            @Result(property = "provinceId",column = "province_id"),
            @Result(property = "provinceCode",column = "province_code"),
            @Result(property = "provinceName",column = "province_name")
    })
    public List<Province> allProvince();

    /*根据省份查询城市*/
    @Select("select CITY_ID,CITY_CODE,CITY_NAME from bs_city where PROVINCE_CODE=#{provinceCode}")
    @Results({
            @Result(property = "cityId",column = "city_id"),
            @Result(property = "cityCode",column = "city_code"),
            @Result(property = "cityName",column = "city_name")
    })
    public List<City> allCity(@Param("provinceCode") String provinceCode);

    /*根据城市查询区*/
    @Select("select area_id,area_code,area_name from bs_area where city_code=#{cityCode}")
    @Results({
            @Result(property = "areaId",column = "area_id"),
            @Result(property = "areaCode",column = "area_code"),
            @Result(property = "areaName",column = "area_name")
    })
    public List<Area> allArea(@Param("cityCode") String cityCode);

}
