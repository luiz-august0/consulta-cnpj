package com.consulta.cnpj.controller;

import com.consulta.cnpj.model.ConsultaCNPJEntityDto;
import com.consulta.cnpj.service.ConsultaCNPJService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/consultacnpj", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ConsultaCNPJController {
    @Autowired
    private ConsultaCNPJService consultaCNPJService;

    @PostMapping
    @ResponseBody
    public ResponseEntity save (@RequestBody ConsultaCNPJEntityDto consultaCNPJEntityDto) {
        return consultaCNPJService.save(consultaCNPJEntityDto);
    }

    @PutMapping("/{cnpj}")
    @ResponseBody
    public ResponseEntity update (@PathVariable("cnpj") String cnpj, @RequestBody ConsultaCNPJEntityDto consultaCNPJEntityDto) {
        return consultaCNPJService.update(consultaCNPJEntityDto, cnpj);
    }

    @GetMapping
    @ResponseBody
    public List<ConsultaCNPJEntityDto> getAll () {
        return consultaCNPJService.getAll();
    }

    @DeleteMapping("/{cnpj}")
    @ResponseBody
    public ResponseEntity delete (@PathVariable("cnpj") String cnpj) {
        return consultaCNPJService.delete(cnpj);
    }

    @GetMapping("/{cnpj}")
    @ResponseBody
    public List<ConsultaCNPJEntityDto> getByCNPJ (@PathVariable("cnpj") String cnpj) {
        return consultaCNPJService.getByCNPJ(cnpj);
    }

    @GetMapping("/ws/{cnpj}")
    @ResponseBody
    public ResponseEntity getCNPJWs (@PathVariable("cnpj") String cnpj) {
        return consultaCNPJService.getCNPJWs(cnpj);
    }
}
