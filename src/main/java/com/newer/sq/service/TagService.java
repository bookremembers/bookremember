package com.newer.sq.service;

import com.newer.sq.domain.Tag;
import com.newer.sq.mapper.TagMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {
    @Autowired
    private TagMapper tagMapper;

    public List<Tag> selectAll(){
        return tagMapper.selectAll();
    }

    public List<Tag> selectByTag(String Tagname){
        return tagMapper.selectByTag(Tagname);
    }
}
