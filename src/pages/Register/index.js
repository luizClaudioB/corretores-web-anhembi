import React, { useState } from 'react';
import './styles.css';

export default function Register(){

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro para poder adquirir nossos benefícios
                    </p>
                </section>

                <form>
                    <input placeholder="Nome"/>
                    <input placeholder="Sobrenome"/>
                    <input placeholder="cell-number"/>

                    <div className="input-group">
                        <input placeholder="Email"type="email"/>
                        <input placeholder="Senha" type="password"  />
                    </div>
                  
                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
                
            </div>
        </div>
    );
}