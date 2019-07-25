package com.newer.sq.service;

import com.newer.sq.domain.Address;
import com.newer.sq.mapper.AddressMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
    @Autowired
    private AddressMapper addressMapper;

    public Address queryAddressById(int addressid){
        return addressMapper.queryAddressById(addressid);
    }
    public int deleteByAddressId(int addressid){
        return addressMapper.deleteByAddressId(addressid);
    }
}
