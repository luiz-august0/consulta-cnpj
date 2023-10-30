CREATE TABLE IF NOT EXISTS consulta_cnpj (
    cnpj VARCHAR(14) NOT NULL PRIMARY KEY,
    razao_social VARCHAR(255),
    cidade VARCHAR(100),
    situacao_cadastral VARCHAR(40),
    data_cadastro DATE,
    endereco TEXT,
    telefone VARCHAR(20)
);