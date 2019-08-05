package com.newer.sq.mapper;

import com.newer.sq.domain.Article;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface ArticleMapper {
    @Insert("insert into sq_article values(null,#{Uid},0,#{Arttitle},#{Arttext}," +
            "#{Arttag},#{ArtphotoPath},now(),#{Bid},#{fonts})")
    public int add(Article article);

    @Select("select * from sq_article where Arttag = #{Arttag} and Artstatus = 0")
    public List<Article> selectByTag(String Arttag);

    public List<Article> selectByTitle(@Param("Arttitle") String Arttitle,
                                       @Param("startIndex") Integer startIndex,
                                       @Param("pageSize") Integer pageSize);

    @Select("select * from sq_article where Artstatus = 0")
    public List<Article> selectAll();

    @Select("select count(*) from sq_article where Artstatus = 0")
    public int selectTotal();

    @Update("update sq_article set Bid = #{Bid} where Artid = #{Artid}")
    public int updById(Article article);

    @Delete("delete sq_article where Artid = #{Artid}")
    public int delById(@Param("Artid") Integer Artid);
}
