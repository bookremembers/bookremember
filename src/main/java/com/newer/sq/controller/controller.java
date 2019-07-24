package com.newer.sq.controller;

import com.newer.sq.service.Sservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class controller {
    @Autowired
    private Sservice sservice;

}
