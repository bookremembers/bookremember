package com.newer.sq.service;

import com.newer.sq.domain.Article;
import com.newer.sq.mapper.ArticleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class ArticleService {
    @Autowired
    private ArticleMapper articleMapper;

    //添加文章
    @Transactional(propagation = Propagation.REQUIRED,
            isolation = Isolation.DEFAULT,rollbackFor = Exception.class)
    public int add(Article article){
        return articleMapper.add(article);
    }

    //根据标题模糊查询文章
    public List<Article> selectByTitle(String Arttitle,Integer startIndex,Integer pageSize){

        return articleMapper.selectByTitle(Arttitle, startIndex, pageSize);
    }

    //查询文章
    public List<Article> selectAll(){
        return articleMapper.selectAll();
    }

    //修改文章
    public int updById(Article article){
        return articleMapper.updById(article);
    }

    //删除文章
    public int delById(Integer Artid){
        return articleMapper.delById(Artid);
    }

    //根据标签查询
    public List<Article> selectByTag(String Arttag){
        return articleMapper.selectByTag(Arttag);
    }

    //查询文章总记录数
    public int selectTotal(){
        return articleMapper.selectTotal();
    }
}
