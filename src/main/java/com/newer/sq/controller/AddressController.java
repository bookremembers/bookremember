package com.newer.sq.controller;

import com.newer.sq.domain.Address;
import com.newer.sq.service.AddressService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
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

    /*修改默认地址*/
    @RequestMapping("setDefaultAddress")
    public int setDefaultAddress(@RequestParam("addressId") Integer addressId,@RequestParam("uid") Integer uid){
        /*查询数据库当前用户是否有默认地址*/
        Address address=addressService.selectByUidType(uid);
        int count=0;
        if (address!=null){
            /*如果有默认地址就修改为普通地址  没有则不修改*/
            count=addressService.updAddress(uid);
            if (count>0){
                /*通过地址主键修改普通地址为默认地址*/
                count+=addressService.setDefaultAddress(addressId);
            }
        }else{
            /*通过地址主键修改普通地址为默认地址*/
            count=addressService.setDefaultAddress(addressId);
        }
        return count;
    }

    /*根据地址id查询地址*/
    @RequestMapping("selectById")
    public Address selectById(Integer addressId){
        return addressService.selectById(addressId);
    }

    /*修改用户地址*/
    @RequestMapping("saveUpdmgs")
    public int saveUpdmgs(@RequestParam("addressId") Integer addressId,@RequestParam("provinceName") String provinceName, @RequestParam("cityName") String cityName, @RequestParam("areaName") String areaName, @RequestParam("aname") String aname, @RequestParam("amore") String amore, @RequestParam("code") Integer code, @RequestParam("phone") String phone) {
        /**/
        Address newAddress=new Address();
        newAddress.setAddressid(addressId);
        newAddress.setProvinceid(provinceName);
        newAddress.setCityid(cityName);
        newAddress.setAreaid(areaName);
        newAddress.setAname(aname);
        newAddress.setAmore(amore);
        newAddress.setCode(code);
        newAddress.setPhone(phone);
         int count=addressService.updateAddressById(newAddress);
        return count;
    }

    /*根据用户id查询当前用户的默认地址为1的*/
    @RequestMapping("selectByUidType")
    public Address selectByUidType(@Param("uid") Integer uid){
        return addressService.selectByUidType(uid);
    }
}