package com.newer.sq.controller;

import com.newer.sq.domain.Article;
import com.newer.sq.domain.Books;
import com.newer.sq.service.Sservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class controller {

    @Autowired
    private Sservice sservice;

    @RequestMapping("cycle")
    public List<Article> cycle(HttpSession session){
        List<Article> recycle=sservice.selesqrecycle(123);
        return recycle;
    }
    @RequestMapping("selesqbook")
    public List<Books> selesqbook(HttpSession session){
        List<Books> recycle=sservice.selesqbook(123);
        return recycle;
    }

    @RequestMapping("delearticle")
    public int delearticle(@RequestParam("artid") Integer artid){
       int funct=sservice.delearticle(artid);
       return funct;
    }

    @RequestMapping("updaarticle")
    public int updaarticle(@RequestParam("artid") Integer artid){
        int funct=sservice.updaarticle(artid);
        return funct;
    }

    @RequestMapping("delebook")
    public int delebook(@RequestParam("bid") Integer bid){
        int funct=sservice.delebook(bid);
        return funct;
    }

    @RequestMapping("updabook")
    public int updabook(@RequestParam("bid") Integer bid){
        int funct=sservice.updabook(bid);
        return funct;
    }
}
