package com.newer.sq.service;

import com.newer.sq.domain.Article;
import com.newer.sq.domain.Books;
import com.newer.sq.mapper.Selectmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class Sservice {
    @Autowired
    private Selectmapper selectmapper;

public List<Article> selesqrecycle(Integer uid){
    List <Article> list=selectmapper.recycle(uid);
    return list;
}

    public List<Books> selesqbook(Integer uid,Integer art){
        return selectmapper.selesqbook(uid,art);
    }

  public int delearticle(Integer artid){
return selectmapper.delearticle(artid);
  }

    public int updaarticle(Integer artid){
        return selectmapper.updaarticle(artid);
    }

    public int delebook(Integer bid){
        return selectmapper.delebook(bid);
    }

    public int updabook(Integer bid){
        return selectmapper.updabook(bid);
    }
}
