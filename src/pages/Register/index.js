import React, { useState, Component, Link } from 'react';
import './styles.css';
import { render } from '@testing-library/react';
import ApiCep from '../../services/ApiCep';
import InputMask from 'react-input-mask';



export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ischeckedS:false,
            ischeckedB:false,
            isdisableS:false,
            isdisableB:false,
            rua: "",
            bairro: "",
            localidade: "",
            estado: "",
        }
    };

    handleCPFB(e) {
        const CPFB=e.target.value
        {console.log(CPFB)}
        var Soma;
        var Resto;
        Soma = 0;
        if (CPFB == "00000000000") return false;
         
        for (let i=1; i<=9; i++) Soma = Soma + parseInt(CPFB.substring(i-1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
       
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(CPFB.substring(9, 10)) ) 
        if(document.getElementById("idCPFB").value!=""){
            return alert("digite um CPFB válido"), document.getElementById("idCPFB").value=""}
       
      Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(CPFB.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
       
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(CPFB.substring(10, 11) ) ){ 
            if(document.getElementById("idCPFB").value!="") return alert("digite um CPF válido"), document.getElementById("idCPFB").value=""}
        
        return true;
        
        }

        handleCPFS(e) {
            const CPFS=e.target.value
            {console.log(CPFS)}
            var Soma;
            var Resto;
            Soma = 0;
            if (CPFS == "00000000000") return false;
             
            for (let i=1; i<=9; i++) Soma = Soma + parseInt(CPFS.substring(i-1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;
           
            if ((Resto == 10) || (Resto == 11))  Resto = 0;
            if (Resto != parseInt(CPFS.substring(9, 10)) ) 
            if(document.getElementById("idCPFS").value!=""){
                return alert("digite um CPFS válido"), document.getElementById("idCPFS").value=""}
           
          Soma = 0;
            for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(CPFS.substring(i-1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;
           
            if ((Resto == 10) || (Resto == 11))  Resto = 0;
            if (Resto != parseInt(CPFS.substring(10, 11) ) ){ 
                if(document.getElementById("idCPFS").value!="") return alert("digite um CPF válido"), document.getElementById("idCPFS").value=""}
            
            return true;
            
            }

        


    handleCEP(e) {
    //pega CEp
        const cep=e.target.value;
        //consultando api
        ApiCep.SearchCep(cep).then((res) =>{
            let rua = res.data.logradouro;
            let bairro = res.data.bairro;
            let localidade = res.data.localidade;
            let estado = res.data.uf;
            //mudando estado
            this.setState({
                rua: rua,
                bairro: bairro,
                localidade: localidade,
                estado: estado
            })
        })

    }
    handleRegister = () => {
        this.props.history.push('/');
    }

    handleCheckBuyer = () => {
        if(!this.state.ischeckedB){
            this.setState({ischeckedB: true});
            this.setState({isdisableS: true});
            
            }else{
            this.setState({ischeckedB: false});
            this.setState({isdisableS: false});
            }
        }

    handleCheckSeller = () => {
        if(!this.state.ischeckedS){
            this.setState({ischeckedS: true});
            this.setState({isdisableB: true});
            }else{
            this.setState({ischeckedS: false});
            this.setState({isdisableB: false})
            }
        }
    
    render() {


        return (
            
            <div>
               

                <div className="register-container">
                    <div className="content">
                        <section>
                            <h1>Cadastro</h1>
                            <p>
                                Faça seu cadastro para poder adquirir nossos benefícios
                            
                            </p>
                        </section>

                        <form className="register-form">
                            <div className="register-container-initial">
                                <div className="left-form">
                                    <div>
                                        <label>Nome</label> <br />
                                        <input type="text"  placeholder="Nome" required={true} />
                                    </div>

                                    <div>
                                        <label>E-mail</label> <br />
                                        <input placeholder="Email" type="email" required={true} />
                                    </div>

                                    <div>
                                        <label>Senha</label> <br />
                                        <input placeholder="Senha" type="password" required={true} />
                                    </div>

                                    <div>
                                        <label>Confirme sua Senha</label> <br />
                                        <input placeholder="Senha" type="password" required={true} />
                                    </div>


                                </div>

                                <div className="right-form">
                                    <div className="inputs">
                                    <div>
                                        <label>Sobrenome</label> <br />
                                        <input placeholder="Sobrenome"  required={true}/>
                                    </div>
 
                                    <div>
                                        <label>celular</label> <br />
                                        <InputMask mask="(99)99999-9999"  required={true}/>
                                    </div>
                                    </div>
                                    <div className="checkBoxes">
                                        <div>
                                            <input disabled={this.state.isdisableB} type="checkbox" onClick={this.handleCheckBuyer} />
                                            <label>Quero comprar</label>
                                        </div>
                                        <div>
                                            <input disabled={this.state.isdisableS} type="checkbox" onClick={this.handleCheckSeller}/>
                                            <label> Quero vender</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>

                        {!!this.state.ischeckedB ?   

                           <form>
                            <div id="form2" className="register-container-buyer">
                                <div className="left-form-2">
                                    <div>
                                        <label>CPF</label> <br />
                                        <input id="idCPFB" placeholder="xxx-xxx-xxx-xx"  value={this.state.value} onBlur={this.handleCPFB} required={true}/>
                                    </div>

                                    <div>
                                        <label>CEP</label> <br />
                                        
                                        <InputMask mask="99999-999"  type="text" onBlur={this.handleCEP.bind(this)} required={true}/>
                                        
                                        <button className="buttonSearchCEPB" onClick={this.handleCEP}>
                                            Buscar
                                        </button>
                                    </div>

                                    <div>
                                        <label>Logradouro</label> <br />
                                        <input placeholder="Logradouro" style={{ width: '350px' }} value={this.state.rua} disabled required={true}/>
                                    </div>

                                    <div>
                                        <label>Complemento</label> <br />
                                        <input placeholder="Complemento" style={{ width: '350px' }} />
                                    </div>
                                </div>

                                <div className="middle-form-2">
                                    <div>
                                        <label>Cidade</label> <br />
                                        <input placeholder="Cidade" value={this.state.localidade} disabled required={true}/>
                                    </div>
                                    <div>
                                        <label>Número</label> <br />
                                        <input placeholder="Número" required={true} />
                                    </div>
                                </div>

                                <div className="right-form-2">
                                    <div>
                                        <label>Bairro</label> <br />
                                        <input placeholder="Ex:Bairro" value={this.state.bairro} disabled required={true}/>
                                    </div>

                                    <div>
                                        <label>Estado</label> <br />
                                        <input placeholder="UF" style={{ width: '50px' }} value={this.state.estado} disabled  />
                                    </div>
                                </div>
                                <button onClick={this.handleRegister} className="buttonRegister" type="submit">
                            Cadastrar
                        </button>
                            </div>

                        </form>
                        :null}

                        {!!this.state.ischeckedS ? 
                        <form>

                        <div id="form2" className="register-container-seller">
                            <div className="left-form-3">
                                <div>
                                    <label>CPF</label> <br />
                                    <input id="idCPFS" placeholder="xxx-xxx-xxx-xx"  value={this.state.value} onBlur={this.handleCPFS} required={true}/>
                                </div>

                                <div>
                                    <label>Registro SUSEP</label> <br />
                                    <input placeholder="xxxxxx-xxx" />
                                </div>

                                <div>
                                    <label>CEP</label> <br />
                                    <InputMask mask="99999-999"  type="text" onBlur={this.handleCEP.bind(this)} required={true}/>
                                
                                    <button className="buttonSearchCEPS" onClick={this.handleCEP}>
                                        Buscar
                                    </button>
                                </div>

                                <div>
                                    <label>Logradouro</label> <br />
                                    <input placeholder="Logradouro" type="text" style={{ width: '350px' }}  value={this.state.rua} disabled />
                                </div>

                                <div>
                                    <label>Complemento</label> <br />
                                    <input placeholder="Complemento" type="text" style={{ width: '350px' }} />
                                </div>
                            </div>

                            <div className="middle-form-3">
                                <div>
                                    <label>Número</label> <br />
                                    <input placeholder="Número" type="number" />
                                </div>

                                <div>
                                    <label>Cidade</label> <br />
                                    <input placeholder="Cidade"  value={this.state.cidade} disabled/>
                                </div>
                            </div>

                            <div className="right-form-3">
                                <div>
                                    <label>Bairro</label> <br />
                                    <input placeholder="Bairro"  value={this.state.bairro} disabled />
                                </div>

                                <div>
                                    <label>Estado</label> <br />
                                    <input placeholder="UF" style={{ width: '50px' }}  value={this.state.estado} disabled />
                                </div>
                            </div>
                            <button onClick={this.handleRegister} className="buttonRegister" type="submit">
                            Cadastrar
                        </button>
                        </div>

                        
                        </form>
                        :null}
                    </div>
                    
                </div>

            </div>
            
            

            

        );
    }
}