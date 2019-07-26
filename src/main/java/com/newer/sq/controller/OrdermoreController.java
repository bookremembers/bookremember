package com.newer.sq.controller;

import com.newer.sq.domain.Ordermore;
import com.newer.sq.domain.User;
import com.newer.sq.service.OrdermoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class OrdermoreController {
    @Autowired
    private OrdermoreService ordermoreService;

    @RequestMapping("queryByordstatus")
    public List<Ordermore> queryBystatus(@RequestParam("ordstatus")String ordstatus){
        List<Ordermore> list = ordermoreService.queryByordstatus(ordstatus);
        return  list;
    }
    @RequestMapping("queryLikeBookname")
    public List<Ordermore> queryLikeBookname(@RequestParam("bname")String bname){
        List<Ordermore> list = ordermoreService.queryLikeBookname(bname);
        System.out.println(list);
        return list;
    }

    @RequestMapping("addOrdermore")
    public int addOrdermore(HttpSession session,@RequestParam("bid")int bid, @RequestParam("ordint") int ordint, @RequestParam("ordstatus")String ordstatus){
        User user = (User) session.getAttribute("user");
        int count = ordermoreService.addOrdermore(user.getUid(),bid,ordint,ordstatus);
        return count;
    }

    @RequestMapping("delOrdermore")
    public int delOrdermore(@RequestParam("ordid")int ordid){
    int count = ordermoreService.delOrdermore(ordid);
    return count;
    }
}
