package com.newer.sq.mapper;

import com.newer.sq.domain.Sqrecycle;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface Selectmapper {
    //查询删除的文章 绑定用户uid
  @Select("select * from Sq_recycle where Uid=#{uid}")
    public List selesqrecycle(@Param("uid") Integer uid);

}
