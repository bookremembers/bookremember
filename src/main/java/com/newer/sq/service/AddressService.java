package com.newer.sq.service;

import com.newer.sq.domain.Address;
import com.newer.sq.mapper.AddressMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AddressService {
    @Autowired
    private AddressMapper addressMapper;

    /*根据用户id查询信息*/
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public List<Address> queryAddressByUid(int uid) {
        return addressMapper.queryAddressByUid(uid);
    }

    public int deleteByAddressId(int addressid) {
        return addressMapper.deleteByAddressId(addressid);
    }

    /*添加地址*/
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public int addAddress(Address address) {
        return addressMapper.addAddress(address);
    }

    /*修改默认地址*/
    /*查询当前用户是否有默认地址*/
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public Address selectByUidType(Integer uid) {
        return addressMapper.selectByUidType(uid);
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public int updAddress(Integer uid) {
        return addressMapper.updAddress(uid);
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public int setDefaultAddress(Integer addressId) {
        return addressMapper.setDefaultAddress(addressId);
    }

    /*根据地址id查询地址*/
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public Address selectById(Integer addressId){
        return addressMapper.selectById(addressId);
    }
    //根据名称查询编码
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public Address saveUpdmgs(String provinceName,String cityName,String areaName){
        return addressMapper.saveUpdmgs(provinceName,cityName,areaName);
    }

    /*修改地址表*/
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    public int updateAddressById(Address address){
        return addressMapper.updateAddressById(address);
    }
}
