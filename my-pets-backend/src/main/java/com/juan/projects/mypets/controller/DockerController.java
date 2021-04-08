package com.juan.projects.mypets.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/docker/hello")
public class DockerController {

    @GetMapping
    public String hello(){
        return "hello!!!";
    }
}
