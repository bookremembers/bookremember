package com.newer.sq.controller;

import com.newer.sq.domain.Photo;
import com.newer.sq.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;

@RestController
public class PhotoController {
    @Autowired
    private PhotoService photoService;
    /*添加图片文章书籍*/
    @RequestMapping("addPhoto")
    public int addPhoto(HttpServletRequest request){
        int count=1;
        /*初始化上下文*//*
        CommonsMultipartResolver multipartResolver=new CommonsMultipartResolver(request.getServletContext());
        *//*判断是否有上传文件*//*
        String readFileName="";
        if (multipartResolver.isMultipart(request)){
            //强制转型
            MultipartHttpServletRequest multipartRequest=(MultipartHttpServletRequest) request;
            //获取请求中的所有文件名称
            Iterator<String> it= multipartRequest.getFileNames();
            while (it.hasNext()){
                *//*根据文件名称获取文件*//*
                MultipartFile file= multipartRequest.getFile(it.next());
                *//*获取文件原始的名称*//*
                String fileName= file.getOriginalFilename();
                *//*获取上传路径*//*
                String path=request.getServletContext().getRealPath("upload");
                System.out.println("------------->"+path);
                File dir=new File(path);
                if (!dir.exists()){
                    *//*创建文件夹*//*
                    dir.mkdir();
                }
                readFileName=dir+"\\"+fileName;
                *//*为了1解决名字冲突*//*
                long time=System.currentTimeMillis();
                try {
                    *//*上传文件*//*
                    file.transferTo(new File(dir,time+"_"+fileName));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        if (!readFileName.equals("")){
            System.out.println("r:"+readFileName);
        }
        String context=request.getParameter("context");
        System.out.println("c:"+context);*/
        return count;
    }

}
