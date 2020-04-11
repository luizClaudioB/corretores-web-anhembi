import React, { useState, Component, Link } from 'react';
import './styles.css';
import { render } from '@testing-library/react';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ischeckedS:false,
            ischeckedB:false,
            isdisableS:false,
            isdisableB:false,
        }
    };

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
                                        <input placeholder="Ex: Maria" />
                                    </div>

                                    <div>
                                        <label>E-mail</label> <br />
                                        <input placeholder="Email" type="email" />
                                    </div>

                                    <div>
                                        <label>Senha</label> <br />
                                        <input placeholder="Senha" type="password" />
                                    </div>

                                    <div>
                                        <label>Confirme sua Senha</label> <br />
                                        <input placeholder="Senha" type="password" />
                                    </div>


                                </div>

                                <div className="right-form">
                                    <div>
                                        <label>Sobrenome</label> <br />
                                        <input placeholder="Ex: Gonçalves" />
                                    </div>

                                    <div>
                                        <label>celular</label> <br />
                                        <input placeholder="(xx)xxxxx-xxxx)" />
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
                                        <input placeholder="xxx-xxx-xxx-xx" />
                                    </div>

                                    <div>
                                        <label>CEP</label> <br />
                                        <input placeholder="xxxxxx-xxx" />
                                        <button className="buttonSearchCEPB">
                                            Buscar
                                        </button>
                                    </div>

                                    <div>
                                        <label>Logradouro</label> <br />
                                        <input placeholder="Avenida dom astolfo pereira" style={{ width: '350px' }} />
                                    </div>

                                    <div>
                                        <label>Complemento</label> <br />
                                        <input placeholder="apartamento 32" style={{ width: '350px' }} />
                                    </div>
                                </div>

                                <div className="middle-form-2">
                                    <div>
                                        <label>Número</label> <br />
                                        <input placeholder="Ex:776" />
                                    </div>

                                    <div>
                                        <label>Cidade</label> <br />
                                        <input placeholder="Paranaiba" />
                                    </div>
                                </div>

                                <div className="right-form-2">
                                    <div>
                                        <label>Bairro</label> <br />
                                        <input placeholder="Ex:lapa" />
                                    </div>

                                    <div>
                                        <label>UF</label> <br />
                                        <input placeholder="SP" style={{ width: '50px' }} />
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
                                    <input placeholder="xxx-xxx-xxx-xx" />
                                </div>

                                <div>
                                    <label>Registro SUSEP</label> <br />
                                    <input placeholder="xxxxxx-xxx" />
                                </div>

                                <div>
                                    <label>CEP</label> <br />
                                    <input placeholder="xxxxxx-xxx" />
                                </div>
                                <div>
                                    <button className="buttonSearchCEPS">
                                        Buscar
                                    </button>
                                </div>

                                <div>
                                    <label>Logradouro</label> <br />
                                    <input placeholder="Avenida dom astolfo pereira" style={{ width: '350px' }} />
                                </div>

                                <div>
                                    <label>Complemento</label> <br />
                                    <input placeholder="apartamento 32" style={{ width: '350px' }} />
                                </div>
                            </div>

                            <div className="middle-form-3">
                                <div>
                                    <label>Número</label> <br />
                                    <input placeholder="Ex:776" />
                                </div>

                                <div>
                                    <label>Cidade</label> <br />
                                    <input placeholder="Paranaiba" />
                                </div>
                            </div>

                            <div className="right-form-3">
                                <div>
                                    <label>Bairro</label> <br />
                                    <input placeholder="Ex:lapa" />
                                </div>

                                <div>
                                    <label>UF</label> <br />
                                    <input placeholder="SP" style={{ width: '50px' }} />
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