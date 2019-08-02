package com.newer.sq.service;

import com.newer.sq.domain.Ordermore;
import com.newer.sq.mapper.OrdermoreMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdermoreService {

    @Autowired
    private OrdermoreMapper ordermoreMapper;

    public List<Ordermore> queryLikeBookname(String bname, String ordstatus) {
        return ordermoreMapper.queryLikeBookname(bname, ordstatus);
    }

    public int addOrdermore(int uid, int bid, int ordint, String ordstatus) {
        return ordermoreMapper.addOrdermore(uid, bid, ordint, ordstatus);
    }

    public int delOrdermore(int ordid) {
        return ordermoreMapper.delOrdermore(ordid);
    }

}
