package com.juan.projects.mypets;

import com.juan.projects.mypets.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
@EnableJpaRepositories(basePackages = { "com.juan.projects.mypets" })
public class MyPetsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyPetsApplication.class, args);
	}

}

