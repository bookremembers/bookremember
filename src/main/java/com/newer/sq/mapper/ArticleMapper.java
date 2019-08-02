package com.newer.sq.mapper;

import com.newer.sq.domain.Article;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface ArticleMapper {
    @Insert("insert into article values(null,#{Uid},#{Artstatus},#{Arttitle},#{Arttext}," +
            "#{Arttag},#{ArtphotoPath},now())")
    public int add(Article article);

    public List<Article> selectByTitle(@Param("Arttitle") String Arttitle,
                                       @Param("startIndex") Integer startIndex,
                                       @Param("pageSize") Integer pageSize);

    @Select("select * from article")
    public List<Article> selectAll();

}
