package com.newer.sq.controller;

import com.newer.sq.domain.Article;
import com.newer.sq.domain.ArticleParameter;
import com.newer.sq.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @RequestMapping("add")
    public int add(Article article){
        int fluRows = articleService.add(article);

        return fluRows;
    }

    @RequestMapping("selectByTitle")
    public ArticleParameter selectByTitle(@RequestParam("Arttitle") String Arttitle,
                                       @RequestParam("startIndex") Integer startIndex,
                                       @RequestParam("pageSize") Integer pageSize){

        System.out.println("index:"+startIndex+"pageSize:"+pageSize);

        List<Article> articles = articleService.selectAll();
        int fonts = 0;
        int titles = 0;
        for(Article article:articles){
            fonts+=article.getFonts();
            titles++;
        }

        List<Article> articlePage = articleService.selectByTitle(Arttitle,startIndex,pageSize);

        int total = articleService.selectTotal()/2;

        ArticleParameter articleParameter = new ArticleParameter();
        articleParameter.setFonts(fonts);
        articleParameter.setTitles(titles);
        articleParameter.setPrints(1);
        articleParameter.setArticles(articlePage);
        articleParameter.setPageTotal(total);


        return articleParameter;

    }

    @RequestMapping("selectAll")
    public List<Article> selectAll(){
        return articleService.selectAll();
    }

    @RequestMapping("selectByTag")
    public List<Article> selectByTag(@RequestParam("Arttag") String Arttag){
        return articleService.selectByTag(Arttag);
    }

    @RequestMapping("updById")
    public int updById(Article article){
        return articleService.updById(article);

    }

    @RequestMapping("delById")
    public int delById(@RequestParam("Artid") Integer Artid){
        return articleService.delById(Artid);
    }

    @RequestMapping("/img")
    public Map<String,Object> uploadImgQiniu(@RequestParam("files") MultipartFile file
                                             ) throws IOException {
        Map<String,Object> map = new HashMap<String,Object>();
        if(!file.isEmpty()) {
            System.out.println(file.getOriginalFilename());
            String fileName = file.getOriginalFilename();
            // 获取后缀
            //String suffixName = fileName.substring(fileName.lastIndexOf("."));
            // 文件上传的路径
            String filePath = "C:/sq/target/classes/static/upload/";
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
    }

    /*public static void main(String[] args) {
        ArticleService articleService = new ArticleService();
        List<Article> articles =articleService.selectByTitle("a",0,1);
        articles.forEach(article -> {
            System.out.println(article.getArttitle());
        });
    }*/



}
