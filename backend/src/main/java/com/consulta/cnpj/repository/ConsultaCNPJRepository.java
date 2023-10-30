package com.consulta.cnpj.repository;

import com.consulta.cnpj.model.ConsultaCNPJEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultaCNPJRepository extends JpaRepository<ConsultaCNPJEntity, String> {
}
