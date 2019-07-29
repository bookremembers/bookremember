package com.newer.sq.mapper;

import com.newer.sq.domain.Address;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface AddressMapper {

    //根据用户id查询地址信息
    @Select("select uid,addressid,Aname,Amore,Acode,Aphone,PROVINCE_NAME,CITY_NAME,AREA_NAME,atype from bs_province,bs_city,bs_area,sq_address a " +
            " where bs_province.PROVINCE_CODE=a.PROVINCE_ID and bs_city.CITY_CODE=a.CITY_ID and AREA_CODE=a.AREA_ID and uid=#{uid} order by atype desc")
    @Results({
            @Result(property = "provinceName", column = "PROVINCE_NAME"),
            @Result(property = "cityName", column = "CITY_NAME"),
            @Result(property = "areaName", column = "AREA_NAME"),
            @Result(property = "code", column = "acode"),
            @Result(property = "phone", column = "aphone"),
    })
    public List<Address> queryAddressByUid(@Param("uid") int uid);

    //根据地址id删除信息
    @Delete("delete from sq_address where addressid = #{addressid}")
    public int deleteByAddressId(@Param("addressid") int addressid);

    //根据地址id修改信息
    @Update("update sq_address set aname=#{aname},aphone=#{phone}, acode=#{code}," +
            "  amore=#{amore}, province_id=#{provinceid}, city_id=#{cityid}, area_id=#{areaid} where addressid=#{addressid}")
    public int updateAddressById(Address address);

    /*添加用户地址*/
    @Insert("insert into sq_address values(null,#{uid},#{provinceid},#{cityid},#{areaid},#{aname},#{amore},#{code},#{phone},0)")
    public int addAddress(Address address);

    /*修改默认地址*/
    /*查询是否当前用户是否有默认地址*/
    @Select("select * from sq_address where uid=#{uid} and atype=1")
    public Address selectByUidType(Integer uid);

    /*根据用户id和类型为1的修改类型为0  因为一个用户的默认地址只会有一个*/
    @Update("update sq_address set atype=0 where uid=#{uid} and atype=1")
    public int updAddress(@Param("uid") Integer uid);

    /*根据地址表id修改类型*/
    @Update("update sq_address set atype=1 where addressid=#{addressId}")
    public int setDefaultAddress(@Param("addressId") Integer addressId);

    /*根据地址id查询地址*/
    @Select("select * from sq_address where AddressId=#{addressId}")
    @Results({
            @Result(property = "provinceid", column = "PROVINCE_ID"),
            @Result(property = "cityid", column = "CITY_ID"),
            @Result(property = "areaid", column = "AREA_ID"),
            @Result(property = "code", column = "acode"),
            @Result(property = "phone", column = "aphone")
    })
    public Address selectById(Integer addressId);

    //保存修改后的信息
    @Select("select p.PROVINCE_CODE,c.CITY_CODE,a.AREA_CODE from bs_province p,bs_city c,bs_area a where p.PROVINCE_CODE =c.PROVINCE_CODE " +
            "  and c.CITY_CODE = a.CITY_CODE and PROVINCE_NAME=#{provinceName} and CITY_NAME = #{cityName} and AREA_NAME = #{areaName} ")
    @Results({
            @Result(property = "provinceid", column = "PROVINCE_CODE"),
            @Result(property = "cityid", column = "CITY_CODE"),
            @Result(property = "areaid", column = "AREA_CODE")
    })
    public Address saveUpdmgs(@Param("provinceName") String provinceName, @Param("cityName") String cityName, @Param("areaName") String areaName);

}
