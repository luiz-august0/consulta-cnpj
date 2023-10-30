import React, { useState } from "react";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
import withReactContent from "sweetalert2-react-content";
import "./MainPage.css";
import { TextField, Button, InputLabel } from '@mui/material';
import InputMask from "react-input-mask"
import { deleteCNPJ, getByCNPJ, getCNPJWs, insert, update } from "../services/api";

const initialValue = { cnpj: "", razao_social: "", cidade: "", situacao_cadastral: "", data_cadastro: "", endereco: "", telefone: "" };

const MainPage = () => {
    const [ state, setState ] = useState(initialValue);
    const [ consulting, setConsulting ] = useState(false);
    const [ consultingAPIWS, setConsultingAPIWS ] = useState(false); 
    const [ inserting, setInserting ] = useState(false); 
    const [ deleting, setDeleting ] = useState(false); 
    const [ consulted, setConsulted ] = useState(false); 
    const [ allowDelete, setAllowDelete ] = useState(false); 

    const onChange = (e) => {
        let {value, id} = e.target;
        if (id === "cnpj") cleanState();

        setState({...state,[id]:value})
    }

    const setDataState = (cnpj, razao_social, cidade, situacao_cadastral, data_cadastro, endereco, telefone) => {
        setState({ cnpj: cnpj, razao_social: razao_social, cidade: cidade, situacao_cadastral: situacao_cadastral, data_cadastro: data_cadastro, endereco: endereco, telefone: telefone });
    }

    const cleanState = () => {
        setConsulted(false);
        setAllowDelete(false);
    }

    const validCNPJ = (cnpj) => {
        if (cnpj.length === 0) {
            MySwal.fire({
                html: <i>CNPJ deve ser informado</i>,
                icon: 'warning'
            })
            return false;
        }

        if (cnpj.length !== 14) {
            MySwal.fire({
                html: <i>CNPJ inválido</i>,
                icon: 'warning'
            })
            return false;
        }

        return true;
    }

    const cnpjFormat = (value) => {
        return value.replaceAll(".", "").replaceAll("/", "").replaceAll("-", "");
    }

    const cellphoneFormat = (value) => {
        return value.replaceAll("(", "").replaceAll(")", "").replaceAll("-", "").replaceAll(" ", "");
    }
    
    const MySwal = withReactContent(Swal);

    const getData = async() => {
        let cnpj = cnpjFormat(state.cnpj);

        if (!validCNPJ(cnpj)) return;

        setConsulting(true);
        try {
            let res;
            let resData;
            
            res = await getByCNPJ(cnpj);
            resData = res.data[0];
            
            if (res.data.length === 0) {
                res = await getCNPJWs(cnpj);
                resData = res.data;
                setDataState(cnpj, resData.razao_social, resData.estabelecimento.cidade.nome, resData.estabelecimento.situacao_cadastral, resData.estabelecimento.data_inicio_atividade, "", "");
            } else {
                setAllowDelete(true);
                setDataState(cnpj, resData.razao_social, resData.cidade, resData.situacao_cadastral, resData.data_cadastro, resData.endereco, resData.telefone);
            }
        } catch (error) {
            if (error.request.status === 429) {
                MySwal.fire({
                    html: <i>Excedido o limite máximo de 3 consultas por minuto, aguarde para realizar a próxima requisição</i>,
                    icon: 'error'
                })  
            } else {
                MySwal.fire({
                    html: <i>Erro ao realizar requisição ao servidor</i>,
                    icon: 'error'
                })  
            }
        }
        setConsulted(true);
        setConsulting(false);
    }

    const getDataCNPJWS = async() => {
        let cnpj = cnpjFormat(state.cnpj);

        if (!validCNPJ(cnpj)) return;

        setConsultingAPIWS(true);
        try {
            const res = await getCNPJWs(cnpj);
            const resData = res.data;
            setDataState(cnpj, resData.razao_social, resData.estabelecimento.cidade.nome, resData.estabelecimento.situacao_cadastral, resData.estabelecimento.data_inicio_atividade, state.endereco, state.telefone);
        } catch (error) {
            if (error.request.status === 429) {
                MySwal.fire({
                    html: <i>Excedido o limite máximo de 3 consultas por minuto, aguarde para realizar a próxima requisição</i>,
                    icon: 'error'
                })  
            } else {
                MySwal.fire({
                    html: <i>Erro ao realizar requisição ao servidor</i>,
                    icon: 'error'
                })  
            }
        }
        setConsultingAPIWS(false);
    }

    const handleSubmit = async() => {
        let cnpj = cnpjFormat(state.cnpj);
        let cellphone = cellphoneFormat(state.telefone);

        if (!validCNPJ(cnpj)) return;

        setInserting(true);
        try {
            if (!allowDelete) {
                await insert(cnpj, state.razao_social, state.cidade, state.situacao_cadastral, state.data_cadastro, state.endereco, cellphone);
                MySwal.fire({
                    html: <i>CNPJ gravado com sucesso</i>,
                    icon: 'success'
                }) 
                setAllowDelete(true);
            } else {
                await update(cnpj, state.razao_social, state.cidade, state.situacao_cadastral, state.data_cadastro, state.endereco, cellphone);
                MySwal.fire({
                    html: <i>CNPJ atualizado com sucesso</i>,
                    icon: 'success'
                })
            }
        } catch (error) {
            MySwal.fire({
                html: <i>Erro ao gravar CNPJ: {error}</i>,
                icon: 'error'
            })  
        }
        setInserting(false);
    }

    const handleDelete = async() => {
        let cnpj = cnpjFormat(state.cnpj);

        if (!validCNPJ(cnpj)) return;

        setDeleting(true);
        try {
            await deleteCNPJ(cnpj);
            MySwal.fire({
                html: <i>CNPJ deletado com sucesso</i>,
                icon: 'success'
            }) 
            setState(initialValue);
            cleanState();
        } catch (error) {
            MySwal.fire({
                html: <i>Erro ao deletar CNPJ: {error}</i>,
                icon: 'error'
            })  
        }
        setDeleting(false);
    }
      
    return (
        <div id="app">
            <p>Consulta CNPJ</p>
            <form className="form" onSubmit={() => {}}>
                <InputMask
                mask="99.999.999/9999-99"
                alwaysShowMask
                value={state.cnpj}
                disabled={false}
                onChange={e => onChange(e)}>
                    {() => <TextField id="cnpj" required placeholder="CNPJ" variant="outlined" margin="dense" label="CNPJ" fullWidth type={'text'}/>}
                </InputMask>
                <div className="actions">
                    <Button color="primary" onClick={() => getData()} variant="contained">
                        {!consulting?'CONSULTAR'
                            :
                            <Oval
                            height={20}
                            width={20}
                            color="#FFFF"
                            wrapperStyle={{ justifyContent: 'center' }}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#FFFF"
                            strokeWidth={3}
                            strokeWidthSecondary={3}
                            />}
                    </Button>
                </div>
                {consulted?
                    <div className="formData">
                        <TextField id="razao_social" value={state.razao_social} onChange={e => onChange(e)} placeholder="Razão social" variant="outlined" margin="dense" label="Razão social" fullWidth type={'text'}/>
                        <TextField id="cidade" value={state.cidade} onChange={e => onChange(e)} placeholder="Cidade" variant="outlined" margin="dense" label="Cidade" fullWidth type={'text'}/>
                        <TextField id="situacao_cadastral" value={state.situacao_cadastral} onChange={e => onChange(e)} placeholder="Situação cadastral" variant="outlined" margin="dense" label="Situação cadastral" fullWidth type={'text'}/>
                        <InputLabel>Data de cadastro</InputLabel>
                        <TextField id="data_cadastro" value={state.data_cadastro} onChange={e => onChange(e)} variant="outlined" margin="dense" fullWidth type={'date'}/>
                        <TextField id="endereco" value={state.endereco} onChange={e => onChange(e)} placeholder="Endereço" variant="outlined" margin="dense" label="Endereço" fullWidth type={'text'}/>
                        <InputMask
                        mask="(99) 99999-9999"
                        alwaysShowMask
                        value={state.telefone}
                        disabled={false}
                        onChange={e => onChange(e)}>
                            {() => <TextField id="telefone" placeholder="Telefone" variant="outlined" margin="dense" label="Telefone" fullWidth type={'text'}/>}
                        </InputMask>
                        
                        <div className="actions">
                            <Button color="success" onClick={() => handleSubmit()} variant="contained">
                                {!inserting?'CONFIRMAR'
                                    :
                                    <Oval
                                    height={20}
                                    width={20}
                                    color="#FFFF"
                                    wrapperStyle={{ justifyContent: 'center' }}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#FFFF"
                                    strokeWidth={3}
                                    strokeWidthSecondary={3}
                                    />}
                            </Button>
                            <Button color="primary" onClick={() => getDataCNPJWS()} variant="contained">
                                {!consultingAPIWS?'CONSULTAR API CNPJ WS'
                                    :
                                    <Oval
                                    height={20}
                                    width={20}
                                    color="#FFFF"
                                    wrapperStyle={{ justifyContent: 'center' }}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#FFFF"
                                    strokeWidth={3}
                                    strokeWidthSecondary={3}
                                    />}
                            </Button>
                            {allowDelete?
                            <Button color="error" onClick={() => handleDelete()} variant="contained">
                            {!deleting?'EXCLUIR'
                                :
                                <Oval
                                height={20}
                                width={20}
                                color="#FFFF"
                                wrapperStyle={{ justifyContent: 'center' }}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#FFFF"
                                strokeWidth={3}
                                strokeWidthSecondary={3}
                                />}
                            </Button>:null}
                        </div>
                    </div>
                :null}
            </form>
        </div>
    );
};

export default MainPage;