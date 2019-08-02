package com.newer.sq.service;

import com.newer.sq.domain.Article;
import com.newer.sq.mapper.ArticleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ArticleService {

    @Autowired
    private ArticleMapper articleMapper;

    @Transactional(propagation = Propagation.REQUIRED,
            isolation = Isolation.DEFAULT,rollbackFor = Exception.class)
    public int add(Article article){
        return articleMapper.add(article);
    }

    public List<Article> selectByTitle(String Arttitle,Integer startIndex,Integer pageSize){
        return articleMapper.selectByTitle(Arttitle, startIndex, pageSize);
    }

    public List<Article> selectAll(){
        return articleMapper.selectAll();
    }

    public List<Article> queryAllByatype1(int atype){
    return articleMapper.queryAllByatype1(atype);
    }

}
