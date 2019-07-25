package com.newer.sq.service;

import com.newer.sq.domain.Area;
import com.newer.sq.domain.City;
import com.newer.sq.domain.Province;
import com.newer.sq.mapper.ProvinceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinceService {
    @Autowired
    private ProvinceMapper provinceMapper;

    /*查询所有省份*/
    public List<Province> allProvince(){
        return provinceMapper.allProvince();
    }

    /*根据省份查询所有城市*/
    public List<City> allCity(String provinceCode){
        return provinceMapper.allCity(provinceCode);
    }

    /*根据城市查询区市*/
    public List<Area> allArea(String cityCode){
        return provinceMapper.allArea(cityCode);
    }

}
