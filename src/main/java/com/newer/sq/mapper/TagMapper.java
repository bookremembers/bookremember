package com.newer.sq.mapper;

import com.newer.sq.domain.Tag;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface TagMapper {
    @Select("select * from sq_tag")
    public List<Tag> selectAll();

    @Select("select * from sq_tag where Tagname = #{Tagname}")
    public List<Tag> selectByTag(String Tagname);
}
