package com.newer.sq.controller;

import com.newer.sq.domain.Print;
import com.newer.sq.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BookController {
    @Autowired
    private BookService bookService;
    //根据id查询信息
    @RequestMapping("queryBookById")
    public Print queryBookById(@RequestParam("pid")int pid){
        System.out.println("ppp");
        Print book = bookService.queryBookById(pid);
        return book;
    }
    
    //查询所以信息
    @RequestMapping("queryBookAll")
    public List<Print> queryBookAll(){
        List<Print> list = bookService.queryBookAll();
        return list;
    }
}
