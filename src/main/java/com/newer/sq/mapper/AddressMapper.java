package com.newer.sq.mapper;

import com.newer.sq.domain.Address;
import org.apache.ibatis.annotations.*;

public interface AddressMapper {

//根据地址id查询信息
    @Select("select * from sq_address where addressid = #{addressid}")
    @Results({
            @Result(property = "provinceid",column = "province_id"),
            @Result(property = "cityid",column = "city_id"),
            @Result(property = "areaid",column = "area_id"),
    })
    public Address queryAddressById(@Param("addressid")int addressid);

    //根据地址id删除信息
    @Delete("delete * from sq_address where addressid = #{addressid}")
    public int deleteByAddressId(@Param("addressid") int addressid);

    //根据地址id修改信息
    @Update("update sq_address set aname=#{aname},aphone=#{aphone},set acode=#{acode}," +
            "set amore=#{amore},set province_id=#{province_id},set city_id=#{city_id},area_id=#{area_id}")
    public int updateAddressById(String aname,String aphone,int acode,String amore,int provinceid,int cityid,int areaid);
}
