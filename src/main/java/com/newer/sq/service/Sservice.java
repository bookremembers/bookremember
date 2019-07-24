package com.newer.sq.service;

import com.newer.sq.mapper.Selectmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Sservice {
    @Autowired
    private Selectmapper selectmapper;

public List selesqrecycle(Integer Uid){
    return selectmapper.selesqrecycle(Uid);
}

}
