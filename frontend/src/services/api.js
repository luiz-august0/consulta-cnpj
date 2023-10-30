import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const insert = async(cnpj, razao_social, cidade, situacao_cadastral, data_cadastro, endereco, telefone) => {
    return api.post("/consultacnpj", { cnpj, razao_social, cidade, situacao_cadastral, data_cadastro, endereco, telefone });
};

export const update = async(cnpj, razao_social, cidade, situacao_cadastral, data_cadastro, endereco, telefone) => {
    return api.put(`/consultacnpj/${cnpj}`, { razao_social, cidade, situacao_cadastral, data_cadastro, endereco, telefone });
};

export const deleteCNPJ = async(cnpj) => {
    return api.delete(`/consultacnpj/${cnpj}`);
};

export const getAll = async() => {
    return api.get("/consultacnpj");
};

export const getByCNPJ = async(cnpj) => {
    return api.get(`/consultacnpj/${cnpj}`);
}

export const getCNPJWs = async(cnpj) => {
    return api.get(`/consultacnpj/ws/${cnpj}`);
};