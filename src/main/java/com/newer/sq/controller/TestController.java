package com.newer.sq.controller;

import ch.qos.logback.core.util.FileUtil;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class TestController {


    /*@ResponseBody
    @RequestMapping("/img")
    public Map<String,Object> uploadImgQiniu(@RequestParam("files") MultipartFile
                                                     file) throws IOException {
        Map<String,Object> map = new HashMap<String,Object>();
        if(!file.isEmpty()) {
            System.out.println(file.getOriginalFilename());
            String fileName = file.getOriginalFilename();
            // 获取后缀
            //String suffixName = fileName.substring(fileName.lastIndexOf("."));
            // 文件上传的路径
            String filePath = "C:/sq/src/main/resources/static/upload/";
            // fileName处理
            long time = System.currentTimeMillis();
            String returnFileName = time+"_"+fileName;
            fileName = filePath+returnFileName;
            // 文件对象
            File dest = new File(fileName);
            // 创建路径
            if(!dest.getParentFile().exists()){
                dest.getParentFile().mkdir();
            }
            try {
                //保存文件
                file.transferTo(dest);

            } catch (IOException e) {
                e.printStackTrace();
            }
            map.put("filename", "upload/"+returnFileName);

        }
        return map;
    }*/





}
