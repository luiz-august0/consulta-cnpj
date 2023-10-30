package com.consulta.cnpj.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "consulta_cnpj")
public class ConsultaCNPJEntity {
    @Id
    private String cnpj;
    private String razao_social;
    private String cidade;
    private String situacao_cadastral;
    private LocalDate data_cadastro;
    private String endereco;
    private String telefone;

    public ConsultaCNPJEntity() {
    }

    public ConsultaCNPJEntity(String cnpj, String razao_social, String cidade, String situacao_cadastral, LocalDate data_cadastro, String endereco, String telefone) {
        this.cnpj = cnpj;
        this.razao_social = razao_social;
        this.cidade = cidade;
        this.situacao_cadastral = situacao_cadastral;
        this.data_cadastro = data_cadastro;
        this.endereco = endereco;
        this.telefone = telefone;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getRazao_social() {
        return razao_social;
    }

    public void setRazao_social(String razao_social) {
        this.razao_social = razao_social;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getSituacao_cadastral() {
        return situacao_cadastral;
    }

    public void setSituacao_cadastral(String situacao_cadastral) {
        this.situacao_cadastral = situacao_cadastral;
    }

    public LocalDate getData_cadastro() { return data_cadastro; }

    public void setData_cadastro(LocalDate data_cadastro) {
        this.data_cadastro = data_cadastro;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}