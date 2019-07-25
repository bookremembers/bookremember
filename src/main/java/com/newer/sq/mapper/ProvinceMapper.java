package com.newer.sq.mapper;

import com.newer.sq.domain.Province;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

public interface ProvinceMapper {
    /*查询所有省份*/
    @Select("select * from province")
    @Results({
            @Result(property = "provinceId",column = "province_id"),
            @Result(property = "")
    })
    public Province queryAll();
}
