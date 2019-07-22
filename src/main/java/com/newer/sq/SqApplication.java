package com.newer.sq;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.newer.sq.mapper")//扫描映射接口
public class SqApplication {

    public static void main(String[] args) {
        SpringApplication.run(SqApplication.class, args);
    }

}
