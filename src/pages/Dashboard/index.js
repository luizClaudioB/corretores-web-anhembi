import './styles.css';
import React, {Component, useState, useEffect} from 'react';
import { slide as Menu } from 'react-burger-menu';
import { HomeOutlined as HomeIcon, WechatOutlined as ChatIcon, 
    UserOutlined as UserIcon, StarOutlined as StarIcon}  from '@ant-design/icons';
import { Avatar, Modal, Button } from 'antd';
import Dialog from '@material-ui/core/Dialog'
import ReactModalLogin from 'react-modal-login';
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types"
import SearchField from "react-search-field";
import ReactSearchBox from 'react-search-box';
import { Input } from 'antd';

const data = [
  {
    key: 'carro',
    value: 'Seguro de automoveis',
  },
  {
    key: 'celular',
    value: 'Seguro de aparelhos moveis',
  },
  {
    key: 'casa',
    value: 'Seguro de residencias',
  },
  {
    key: 'vida',
    value: 'Seguro de vida',
  },
  {
    key: 'moto',
    value: 'Seguro de motocicletas',
  },
]

const facebook = {
  appId: "YOUR FB APP ID GOES HERE",
  cookie: true,
  xfbml: true,
  version: "v3.2",
  scope: "email"
};

const google = {
  client_id: "YOUR_CLIENT_ID.apps.googleusercontent.com",
  scope: "profile email"
};
export default class Dashboard extends Component {
    constructor(props){
    super(props);
    this.state = {
      showModal: false,
      loggedIn: null,
      loading: false,
      error: null,
      initialTab: null,
      recoverPasswordSuccess: null,
      showSocialMedia: true,
    };
    }

    onLogin() {
      console.log('__onLogin__');
      console.log('email: ' + document.querySelector('#email').value);
      console.log('password: ' + document.querySelector('#password').value);
  
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
  
      if (!email || !password) {
        this.setState({
          error: true
        })
      } else {
        this.onLoginSuccess('form');
      }
    }
  
    onRegister() {
      this.props.history.push('/register');
    }
  
    onRecoverPassword() {
      console.log('__onFotgottenPassword__');
      console.log('email: ' + document.querySelector('#email').value);
  
      const email = document.querySelector('#email').value;
  
  
      if (!email) {
        this.setState({
          error: true,
          recoverPasswordSuccess: false
        })
      } else {
        this.setState({
          error: null,
          recoverPasswordSuccess: true
        });
      }
    }
  
    openModal(initialTab) {
      this.setState({
        initialTab: initialTab
      }, () => {
        this.setState({
          showModal: true,
        })
      });
    }
  
    onLoginSuccess(method, response) {
  
      this.closeModal();
      this.setState({
        loggedIn: method,
        loading: false
      })
    }
  
    onLoginFail(method, response) {
  
      this.setState({
        loading: false,
        error: response
      })
    }
  
    startLoading() {
      this.setState({
        loading: true
      })
    }
  
    finishLoading() {
      this.setState({
        loading: false
      })
    }
  
    afterTabsChange() {
      this.setState({
        error: null,
        recoverPasswordSuccess: false,
      });
      if(this.state.showSocialMedia){
        this.setState({
          showSocialMedia: false
        })
      }else{
        this.setState({
          showSocialMedia: true
        })
      }
    }
  
    closeModal() {
      this.setState({
        showModal: false,
        error: null
      });
    }
    
    render(){
    const loggedIn = this.state.loggedIn
    const isLoading = this.state.loading;
    return(
    <div className="div1"> 
    <header className="dashboard-header">
        <div>
        <h1>
        <Menu>
            <div>
            <HomeIcon className="icons"> </HomeIcon>
            <a id="home" className="menu-item">Home</a> 
            </div>
            <div>
            <StarIcon className="icons"> </StarIcon>
            <a id="chat" className="menu-item">Favoritos</a>
            </div>
            <div>
            <ChatIcon className="icons"> </ChatIcon>
            <a id="chat" className="menu-item">Chats</a>
            </div>
        </Menu>
        </h1>
        </div>
        <div>
        
        </div>
        <div>
        <button
          style={{marginLeft: 1200, marginTop: 40}}
          className="RML-btn"
          onClick={() => this.openModal('login')}
        >
          {!!loggedIn ? 
          "Seja bem-vindo!" :
          "Entre ou cadastre-se"}
        </button>

        <ReactModalLogin
          visible={this.state.showModal}
          onCloseModal={this.closeModal.bind(this)}
          loading={isLoading}
          initialTab={this.state.initialTab}
          error={this.state.error}
          tabs={{
            afterChange: this.afterTabsChange.bind(this)
          }}
          startLoading={this.startLoading.bind(this)}
          finishLoading={this.finishLoading.bind(this)}
          form={{
            onLogin: this.onLogin.bind(this),
            onRegister: this.onRegister.bind(this),
            onRecoverPassword: this.onRecoverPassword.bind(this),

            recoverPasswordSuccessLabel: this.state.recoverPasswordSuccess
              ? {
                  label: "Uma nova senha foi enviada para seu e-mail!"
                }
              : null,
            recoverPasswordAnchor: {
              label: "Esqueceu sua senha?"
            },
            loginBtn: {
              label: "Entre"
            },
            registerBtn: {
              label: "Cadastre-se"
            },
            recoverPasswordBtn: {
              label: "Envie uma nova senha"
            },
            loginInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Password',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Password',
              }
            ],
            recoverPasswordInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
            ],
          }}
          separator={{
            label: this.state.showSocialMedia ? "ou" : "Para se cadastrar, clique no botao abaixo: "
          }}
          providers={{
            facebook: this.state.showSocialMedia ? {
              config: facebook,
              onLoginSuccess: this.onLoginSuccess.bind(this),
              onLoginFail: this.onLoginFail.bind(this),
              inactive: isLoading,
              label: "Entre com Facebook"
            } : null,
            google: this.state.showSocialMedia ? {
              config: google,
              onLoginSuccess: this.onLoginSuccess.bind(this),
              onLoginFail: this.onLoginFail.bind(this),
              inactive: isLoading,
              label: "Entre com Google"
            } : null
          }}
        />
        {loggedIn}
      </div>
    </header>
    </div>
    );
    }
}