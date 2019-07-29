package com.newer.sq.service;

import com.newer.sq.domain.Area;
import com.newer.sq.domain.City;
import com.newer.sq.domain.Province;
import com.newer.sq.mapper.ProvinceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProvinceService {

    @Autowired
    private ProvinceMapper provinceMapper;

    /*查询所有省份*/
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,rollbackFor = Exception.class)
    public List<Province> allProvince(){
        return provinceMapper.allProvince();
    }

    /*根据省份查询所有城市*/
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,rollbackFor = Exception.class)
    public List<City> allCity(String provinceCode){
        return provinceMapper.allCity(provinceCode);
    }

    /*根据城市查询区市*/
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,rollbackFor = Exception.class)
    public List<Area> allArea(String cityCode){
        return provinceMapper.allArea(cityCode);
    }

}
