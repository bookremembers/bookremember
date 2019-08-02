package com.newer.sq.service;

import com.newer.sq.domain.Books;
import com.newer.sq.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    //根据id查询书籍信息
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,rollbackFor = Exception.class)
    public Books queryById(int bid){
    return orderMapper.queryById(bid);
    }
    //加
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,rollbackFor = Exception.class)
    public int addNumberPrice(){
    return orderMapper.addNumberPrice();
    }
    //减
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,rollbackFor = Exception.class)
    public int reduceNumberPrice(){
        return orderMapper.reduceNumberPrice();
    }
    //查询所有
    public List<Books> queryAll(){
        return orderMapper.queryAll();
    }
}
