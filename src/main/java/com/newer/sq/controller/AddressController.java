package com.newer.sq.controller;

import com.newer.sq.domain.Address;
import com.newer.sq.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController {
    @Autowired
    private AddressService addressService;
//根据地址id查询信息
    @RequestMapping("queryAddressById")
    public Address queryAddressById(@RequestParam("addressid")int addressid){
        Address address = addressService.queryAddressById(addressid);
        return address;
    }
    //根据地址id删除信息
    @RequestMapping("deleteByAddressId")
    public int deleteByAddressId(@RequestParam("addressid")int addressid){
        int count = addressService.deleteByAddressId(addressid);
        return count;
    }
}
