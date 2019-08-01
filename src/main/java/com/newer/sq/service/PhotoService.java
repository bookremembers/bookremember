package com.newer.sq.service;

import com.newer.sq.domain.Photo;
import com.newer.sq.mapper.PhotoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PhotoService {
    @Autowired
    private PhotoMapper photoMapper;

    /*添加图片书*/
    public int addPhoto(Photo photo){
        return photoMapper.addPhoto(photo);
    }
}
