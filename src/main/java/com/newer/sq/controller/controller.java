package com.newer.sq.controller;

import com.mysql.cj.Session;
import com.newer.sq.service.Sservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class controller {
    @Autowired
    private Sservice sservice;
    /*@RequestMapping("recycle")
   public List selesqrecycle(HttpSession session){
     List recycle=sservice.selesqrecycle(123);
     return recycle;
   }*/
}
