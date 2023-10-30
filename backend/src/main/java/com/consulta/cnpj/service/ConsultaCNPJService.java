package com.consulta.cnpj.service;

import com.consulta.cnpj.model.ConsultaCNPJEntity;
import com.consulta.cnpj.model.ConsultaCNPJEntityDto;
import com.consulta.cnpj.repository.ConsultaCNPJRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConsultaCNPJService {
    @Autowired
    private ConsultaCNPJRepository repository;
    private final String API_URL_CNPJWS = "https://publica.cnpj.ws/cnpj";

    public ConsultaCNPJEntityDto convert (ConsultaCNPJEntity consultaCNPJEntity) {
        ConsultaCNPJEntityDto result = new ConsultaCNPJEntityDto(
                consultaCNPJEntity.getCnpj(),
                consultaCNPJEntity.getRazao_social(),
                consultaCNPJEntity.getCidade(),
                consultaCNPJEntity.getSituacao_cadastral(),
                consultaCNPJEntity.getData_cadastro(),
                consultaCNPJEntity.getEndereco(),
                consultaCNPJEntity.getTelefone()
        );
        return result;
    }

    public ResponseEntity save (ConsultaCNPJEntityDto consultaCNPJEntityDto) {
        ConsultaCNPJEntity consultaCNPJEntity = new ConsultaCNPJEntity(
                consultaCNPJEntityDto.getCnpj(),
                consultaCNPJEntityDto.getRazao_social(),
                consultaCNPJEntityDto.getCidade(),
                consultaCNPJEntityDto.getSituacao_cadastral(),
                consultaCNPJEntityDto.getData_cadastro(),
                consultaCNPJEntityDto.getEndereco(),
                consultaCNPJEntityDto.getTelefone()
        );

        if (!consultaCNPJEntityDto.getCnpj().isEmpty()) {
            repository.save(consultaCNPJEntity);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } else {
            return  ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).build();
        }
    }

    public ResponseEntity update (ConsultaCNPJEntityDto consultaCNPJEntityDto, String cnpj) {
        List <ConsultaCNPJEntity> consultaCNPJEntityList = repository.findById(cnpj).stream().toList();

        if (!consultaCNPJEntityList.isEmpty()) {
            ConsultaCNPJEntity consultaCNPJEntity = consultaCNPJEntityList.get(0);
            consultaCNPJEntity.setRazao_social(consultaCNPJEntityDto.getRazao_social());
            consultaCNPJEntity.setCidade(consultaCNPJEntityDto.getCidade());
            consultaCNPJEntity.setSituacao_cadastral(consultaCNPJEntityDto.getSituacao_cadastral());
            consultaCNPJEntity.setData_cadastro( consultaCNPJEntityDto.getData_cadastro());
            consultaCNPJEntity.setEndereco(consultaCNPJEntityDto.getEndereco());
            consultaCNPJEntity.setTelefone(consultaCNPJEntityDto.getTelefone());
            repository.save(consultaCNPJEntity);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity delete (String cnpj) {
        repository.deleteById(cnpj);
        return ResponseEntity.ok().build();
    }

    public List<ConsultaCNPJEntityDto> getAll () {
        return repository.findAll().stream().map(this::convert).collect(Collectors.toList());
    }

    public List<ConsultaCNPJEntityDto> getByCNPJ (String cnpj) {
        return repository.findById(cnpj).stream().map(this::convert).collect(Collectors.toList());
    }

    public ResponseEntity getCNPJWs (String cnpj) {
        if (cnpj.trim().length() == 14) {
            String endpoint = API_URL_CNPJWS + "/" + cnpj;
            RestTemplate restTemplate = new RestTemplate();

            try {
                String cnpjWS = restTemplate.getForObject(endpoint, String.class);
                return ResponseEntity.ok(cnpjWS);
            } catch (HttpClientErrorException e) {
                return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
            }

        } else {
            return ResponseEntity.ok().build();
        }
    }
}
