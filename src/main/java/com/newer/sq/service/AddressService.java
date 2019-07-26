package com.newer.sq.service;

import com.newer.sq.domain.Address;
import com.newer.sq.mapper.AddressMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {
    @Autowired
    private AddressMapper addressMapper;

    /*根据用户id查询信息*/
    public List<Address> queryAddressByUid(int uid){
        return addressMapper.queryAddressByUid(uid);
    }
    public int deleteByAddressId(int addressid){
        return addressMapper.deleteByAddressId(addressid);
    }

    /*添加地址*/
    public int addAddress(Address address){
        return addressMapper.addAddress(address);
    }
}
