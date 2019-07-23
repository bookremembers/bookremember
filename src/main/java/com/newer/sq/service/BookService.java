package com.newer.sq.service;

import com.newer.sq.domain.Book;
import com.newer.sq.mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BookService {
    @Autowired
    private BookMapper bookMapper;
    //根据id查询信息
    public Book queryBookById(int pid){
        return bookMapper.queryBookById(pid);
    }
    
    public List<Book> queryBookAll(){
        return bookMapper.queryBookAll();
    }
}
