package com.newer.sq.mapper;

import com.newer.sq.domain.Photo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

public interface PhotoMapper {
    @Insert("insert into sq_photo values(null,#{imga},#{imgb},#{imgc},#{imgd},#{imge},#{context},#{bid},new())")
    public int addPhoto(Photo photo);
}
