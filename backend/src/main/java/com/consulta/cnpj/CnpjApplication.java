package com.consulta.cnpj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.consulta.cnpj")
@EnableJpaRepositories(basePackages = "com.consulta.cnpj")
public class CnpjApplication {

	public static void main(String[] args) {
		SpringApplication.run(CnpjApplication.class, args);
	}

}
