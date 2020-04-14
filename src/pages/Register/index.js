import React, { useState, Component, Link } from 'react';
import './styles.css';
import { render } from '@testing-library/react';
import ApiCep from '../../services/ApiCep';
import InputMask from 'react-input-mask';
import fire from './../../config/Fire';
import {TextField, Input, Checkbox, Button} from '@material-ui/core'




export default class Register extends Component {
    constructor(props) {
        super(props);
          this.handleChange = this.handleChange.bind(this);
          this.signup = this.signup.bind(this);
        this.state = {
            ischeckedS:false,
            ischeckedB:false,
            isdisableS:false,
            isdisableB:false,
            rua: "",
            bairro: "",
            localidade: "",
            estado: "",
            user:false,
            email: "",
            password: "",
            success: false
        };
    }

    signup(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).then((u)=>{alert("Usuário criado, volte para a tela inicial")})
        .catch((error) => {
            console.log(error);
            alert("erro: revise seus dados e tente novamente")
          })
          
        }


      handleChange(e){
        this.setState({ [e.target.name ]: e.target.value });
      }
  

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
                    
                        <div className= "register-text">
                            <Button onClick={() => this.props.history.push('/') }>Retornar a tela inicial</Button>
                            <h1>Cadastro</h1>
                            <p>
                                Faça seu cadastro para poder conversar com corretores e adquirir seus serviços!
                            
                            </p>
                        </div>
                    <div className="register-forms">

                        <form className="register-form">
                            <div className="register-container-initial">
                                <div className="left-form">
                                    <div>
                                        <Input type="text"  placeholder="Nome" required={true} />
                                    </div>

                                    <div>
                                       <Input value={this.state.email} onChange={this.handleChange} name="email" placeholder="Email" />
                                    </div>

                                    <div>
                                      <Input value={this.state.password} onChange={this.handleChange} type="password" name="password" placeholder="Password" />
                                    </div>

                                    <div>
                                        <Input placeholder="Confirme sua senha" type="password" required={true} />
                                    </div>


                                </div>

                                <div className="right-form">
                                    <div className="inputs">
                                    <div>
                                        <Input placeholder="Sobrenome"  required={true}/>
                                    </div>
 
                                    <div><Input placeholder = "número celular">
                                        {/* <InputMask mask="(99)99999-9999"  required={true}/> */}
                                        </Input>
                                    </div>
                                    </div>
                                    <div className="checkBoxes">
                                        <div>
                                            <Checkbox disabled={this.state.isdisableB} onClick={this.handleCheckBuyer} />
                                            <label>Quero comprar</label>
                                        </div>
                                        <div>
                                            <Checkbox disabled={this.state.isdisableS} onClick={this.handleCheckSeller}/>
                                            <label> Quero vender</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>

                        {!!this.state.ischeckedB ?   

                           <form>
                            <div id="form2" className="register-container-buyer">
                                <div className="form-buyer">
                                    <div>
                                        <Input id="idCPFB" placeholder="CPF"  value={this.state.value} onBlur={this.handleCPFB} />
                                    </div>

                                    <div>
                                        
                                        {/* <InputMask mask="99999-999"  type="text" onBlur={this.handleCEP.bind(this)} required={true}/> */}
                                        <Input placeholder="CEP" type="text" onBlur={this.handleCEP.bind(this)} />

                                    
                                    </div>

                                    <div>
                                        <Input placeholder="Logradouro" style={{ width: '375px' }} value={this.state.rua} disabled/>
                                    </div>

                                    
                                <div>
                                <div className="left-form-adress">

                                    <div>
                                        <Input placeholder="Cidade" value={this.state.localidade} disabled />
                                    </div>
                                    <div>
                                        <Input placeholder="Número" required={true} />
                                    </div>
                                </div>
                                    <div className="right-form-adress">
                                    <div>
                                        <Input placeholder="Ex:Bairro" value={this.state.bairro} disabled />
                                    </div>

                                    <div>
                                        <Input placeholder="UF" style={{ width: '50px' }} value={this.state.estado} disabled  />
                                    </div>
                                    </div>
                                </div>
                                <div>
                                        <Input placeholder="Complemento" style={{ width: '375px' }} />
                                    </div>
                                </div>
                                <Button variant="contained"  onClick={this.signup} className="buttonRegister">
                            Cadastrar
                        </Button>
                            </div>

                        </form>
                        :null}

                        {!!this.state.ischeckedS ? 
                        <form>

                        <div id="form2" className="register-container-seller">
                            <div className="form-seller">
                                <div>
                                    <Input id="idCPFS" placeholder="CPF"  value={this.state.value} onBlur={this.handleCPFS} required={true}/>
                                </div>

                                <div>
                                    <Input placeholder="Registro SUSEP" />
                                </div>

                                <div>
                                    {/* <InputMask mask="99999-999"  type="text" onBlur={this.handleCEP.bind(this)} required={true}/> */}
                                    <Input placeholder="CEP"onBlur={this.handleCEP.bind(this)} required={true}/>
                                </div>

                                <div>
                                    <Input placeholder="Logradouro" style={{ width: '375px' }} value={this.state.rua} disabled />
                                </div>

                                <div>
                                    <div className="left-form-adress">

                                        <div>
                                            <Input placeholder="Cidade" value={this.state.localidade} disabled />
                                        </div>
                                        <div>
                                            <Input placeholder="Número" required={true} />
                                        </div>

                                    </div>

                                    <div className="right-form-adress">

                                        <div>
                                            <Input placeholder="Ex:Bairro" value={this.state.bairro} disabled />
                                        </div>

                                        <div>
                                            <Input placeholder="UF" style={{ width: '50px' }} value={this.state.estado} disabled  />
                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <Input placeholder="Complemento" style={{ width: '375px' }} />
                                </div>
                            </div>
                            <Button variant="contained" onClick={this.signup} type="submit" className="buttonRegister">
                                Cadastrar
                            </Button>
                        </div>

                        
                        </form>
                        :null}
                    </div>
                    </div>
                    
                </div>

            </div>
            
            

            

        );
    }
}