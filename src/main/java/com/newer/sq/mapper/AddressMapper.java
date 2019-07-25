package com.newer.sq.mapper;

import com.newer.sq.domain.Address;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface AddressMapper {

//根据用户id查询信息
    @Select("select uid,addressid,Aname,Amore,Acode,Aphone,PROVINCE_NAME,CITY_NAME,AREA_NAME,atype from bs_province,bs_city,bs_area,sq_address a " +
            " where bs_province.PROVINCE_CODE=a.PROVINCE_ID and bs_city.CITY_CODE=a.CITY_ID and AREA_CODE=a.AREA_ID and uid=#{uid} order by atype desc")
    @Results({
            @Result(property = "provinceName",column = "PROVINCE_NAME"),
            @Result(property = "cityName",column = "CITY_NAME"),
            @Result(property = "areaName",column = "AREA_NAME"),
            @Result(property = "code",column = "acode"),
            @Result(property = "phone",column = "aphone"),
    })
    public List<Address> queryAddressByUid(@Param("uid")int uid);

    //根据地址id删除信息
    @Delete("delete from sq_address where addressid = #{addressid}")
    public int deleteByAddressId(@Param("addressid") int addressid);

    //根据地址id修改信息
    @Update("update sq_address set aname=#{aname},aphone=#{aphone},set acode=#{acode}," +
            "set amore=#{amore},set province_id=#{province_id},set city_id=#{city_id},area_id=#{area_id}")
    public int updateAddressById(String aname,String aphone,int acode,String amore,int provinceid,int cityid,int areaid);

    /*添加用户地址*/
    @Insert("insert into sq_address values(null,#{uid},#{provinceid},#{cityid},#{areaid},#{aname},#{amore},#{code},#{phone},0)")
    public int addAddress(Address address);
}
