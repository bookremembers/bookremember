package com.newer.sq.controller;

import com.newer.sq.domain.Books;
import com.newer.sq.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderController {
    @Autowired
    public OrderService orderService;
    //根据id查询书籍信息
    @RequestMapping("queryById")
    public Books queryById(@RequestParam("bid")int bid){
        Books books = orderService.queryById(bid);
        return books;
    }
    //加
    @RequestMapping("addNumberPrice")
    public int addNumberPrice(){
        int count = orderService.addNumberPrice();
        return count;
    }
    //减
    @RequestMapping("reduceNumberPrice")
    public int reduceNumberPrice(){
        int count = orderService.reduceNumberPrice();
        return count;
    }
    //queryAll
    @RequestMapping("queryAll")
    public List<Books> queryAll(){
        List<Books> list = orderService.queryAll();
        return list;
    }
}
