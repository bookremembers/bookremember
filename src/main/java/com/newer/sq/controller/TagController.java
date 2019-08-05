package com.newer.sq.controller;

import com.newer.sq.domain.Tag;
import com.newer.sq.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TagController {
    @Autowired
    private TagService tagService;

    @RequestMapping("selectTag")
    public List<Tag> selectAll(){
        return tagService.selectAll();
    }

    @RequestMapping("selectByTagName")
    public List<Tag> selectByTag(@RequestParam("Tagname") String Tagname){
        return tagService.selectByTag(Tagname);
    }
}
