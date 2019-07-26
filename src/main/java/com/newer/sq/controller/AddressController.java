package com.newer.sq.controller;

import com.newer.sq.domain.Address;
import com.newer.sq.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AddressController {
    @Autowired
    private AddressService addressService;

    //根据用户id查询地址
    @RequestMapping("queryAddressByUid")
    public List<Address> queryAddressByUid(@RequestParam("uid") int uid) {
        return addressService.queryAddressByUid(uid);
    }

    //根据地址id删除信息
    @RequestMapping("deleteByAddressId")
    public int deleteByAddressId(@RequestParam("addressid") int addressid) {
        int count = addressService.deleteByAddressId(addressid);
        return count;
    }

    /*添加地址*/
    @RequestMapping("addAddress")
    public int addAddress(Address address) {
        return addressService.addAddress(address);
    }
}
