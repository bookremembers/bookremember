package com.newer.sq.service;

import com.newer.sq.domain.Print;
import com.newer.sq.mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BookService {
    @Autowired
    private BookMapper bookMapper;
    //根据id查询信息
    public Print queryBookById(int pid){
        return bookMapper.queryBookById(pid);
    }
    
    public List<Print> queryBookAll(){
        return bookMapper.queryBookAll();
    }
}
