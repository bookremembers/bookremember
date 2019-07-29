package com.newer.sq.mapper;

import com.newer.sq.domain.Print;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;


public interface BookMapper {
//    根据pid查询拾柒书信息
    @Select("select * from sq_print where pid = #{pid}")
    public Print queryBookById(@Param("pid") int pid);
    
    @Select("select * from sq_print")
    public List<Print> queryBookAll();
}
