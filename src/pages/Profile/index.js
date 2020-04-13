import './styles.css';
import 'react-calendar/dist/Calendar.css';
import React, {Component, ReactText} from 'react';
import { HomeOutlined as HomeIcon, WechatOutlined as ChatIcon, 
    UserOutlined as UserIcon, StarOutlined as StarIcon}  from '@ant-design/icons';
import Dialog from '@material-ui/core/Dialog'
import ReactModalLogin from 'react-modal-login';
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types"
import { Input, PageHeader, Rate } from 'antd';
import { SearchInput, IconButton, Button, Popover, Menu, Avatar, Combobox, Text, Textarea, TagInput, Icon,
    Pane, SideSheet, Heading, Paragraph, Tablist, Tab, Card, Table, TabNavigation, Badge, Label, toaster} from 'evergreen-ui';
import ReactStarsRating from 'react-awesome-stars-rating';
import Calendar from 'react-calendar'

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
export default class Profile extends Component {
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
      selectedIndex: 0,
      sobreLucas: false,
      sobreLuiz: false,
      sobreRaphael: false,
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

    clearAll(){
        this.setState({
        sobreLucas: false,
        sobreLuiz: false,
        sobreRaphael: false,
      });
    }
    
    render(){
    const loggedIn = this.state.loggedIn
    const isLoading = this.state.loading;
    const onChange = (value) => {
        console.log(`React Stars Rating value is ${value}`);
      };
    const FilterRating = ({ value }) => {
        return <ReactStarsRating onChange={onChange} value={value} />;
    };
    const VendorRating = ({ value }) => {
        return <ReactStarsRating value={5} isEdit={false} />;
      };

    return(
    <div className="div1"> 
    <header className="dashboard-header">
        <div>
        <Popover
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item onClick={() => this.props.history.push('/') } icon="home">Pagina Inicial</Menu.Item>
                <Menu.Item onClick={() => this.props.history.push('/search') } icon="search">Busque Corretores</Menu.Item>
                <Menu.Item onClick={() => this.props.history.push('/profile') } icon="star-empty">Curriculos da Equipe</Menu.Item>
                <Menu.Item onClick={() => this.props.history.push('/history') } icon="history">
                  Historico
                </Menu.Item>
                <Menu.Item onClick={() => this.props.history.push('/enterprise') } icon="info-sign">Sobre Nos</Menu.Item>
              </Menu.Group>
              <Menu.Divider />
            </Menu>
          }
        >
          <IconButton style={{position: 'fixed'}} className="menu-button" appearance="minimal" icon="menu" iconSize={50} />
        </Popover>
        <br />
        <br />
        <SearchInput top={20} marginLeft={360} width={700} height={40} position="fixed" placeholder="Procure um seguro" />
        {!!loggedIn ? 
        <Avatar
          style={{marginLeft: 1320, marginTop: 15, position: 'fixed'}}
          src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
          name="Alan Turing"
          size={40}
        />
        : 
        <Button
          style={{marginLeft: 1210, marginTop: 15, position: 'fixed'}}
          className="RML-btn"
          onClick={() => this.openModal('login')}
          appearance="minimal"
        >
        Entre ou cadastre-se
        </Button>
        }
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
    <div>
        <TabNavigation position='fixed' backgroundColor='#E26B15' width={1500} marginLeft={-10}>
        {['Veiculos', 'Viagens', 'Empresarial', 'Residencia', 'Vida', 'Equipamentos eletronicos'].map((tab, index) => (
            <Tab marginLeft={130} key={tab} is="h" href="#" id={tab} isSelected={index === null}
            onSelect={() => this.props.history.push('/search')}>
            {tab}
            </Tab>
        ))}
        </TabNavigation>
    </div>
    <div>
    <body>
    <div>
    <div style={{position: 'fixed', marginLeft: 30, marginTop: 100, width: 300, float: 'left', 
    height: 400, borderRight: '1px solid rgb(214, 206, 200)' }}>
    <Heading size={700} marginBottom={20}>Curriculos da Equipe</Heading>
    <p><Button appearance="minimal" onClick={() => {this.clearAll(); this.setState({sobreLucas: true})}} marginBottom={10}>Lucas Henrique</Button></p>
    <p><Button appearance="minimal" onClick={() => {this.clearAll(); this.setState({sobreLuiz: true})}} marginBottom={10}>Luiz Claudio</Button></p>
    <p><Button appearance="minimal" onClick={() => {this.clearAll();this.setState({sobreRaphael: true})}} marginBottom={10}>Raphael Henrique</Button></p>
    </div>
    </div>
    {!!this.state.sobreLucas ? 
    <div>
    <div style={{position: 'absolute', position: 'fixed', marginLeft: 400, marginTop: 100, width: 500, float: 'left'}}>
    <Heading size={700} marginBottom={10}>Lucas Henrique Bonfim Romero</Heading>
    </div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 150, width: 700, float: 'left'}}>
    <Heading size={500} marginBottom={10}>Idade: 20</Heading>
    <Heading size={500} marginBottom={10}>Faculdade: Universidade Anhembi Morumbi</Heading>
    <Heading size={500} marginBottom={10}>Curso: Sistemas de Informacao</Heading>
    <Heading size={500} marginBottom={10}>Empresa atual: Tenbu</Heading>
    <Heading size={500} marginBottom={10}>Conhecimento em linguagens de programacao: Java, PHP e JavaScript (React.js)</Heading>
    <br />
    <br />
    <a href="https://www.linkedin.com/in/lucas-bonfim-romero/"><Heading size={500} marginBottom={10}> Clique aqui e acesse o LinkedIn de Lucas Henrique </Heading>  </a>
    </div>
    </div> : null}
    {!!this.state.sobreLuiz ? 
    <div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 100, width: 500, float: 'left'}}>
    <Heading size={700} marginBottom={10}>Luiz Claudio Bosco Massarollo Filho</Heading>
    </div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 150, width: 700, float: 'left'}}>
    <Heading size={500} marginBottom={10}>Idade: 20</Heading>
    <Heading size={500} marginBottom={10}>Faculdade: Universidade Anhembi Morumbi</Heading>
    <Heading size={500} marginBottom={10}>Curso: Sistemas de Informacao</Heading>
    <Heading size={500} marginBottom={10}>Empresa atual: IBM</Heading>
    <Heading size={500} marginBottom={10}>Conhecimento em linguagens de programacao: Java (SpringBoot) e JavaScript (React.js e React Native)</Heading>
    <br />
    <br />
    <a href="https://www.linkedin.com/in/luizclaudiofilho99/"><Heading size={500} marginBottom={10}> Clique aqui e acesse o LinkedIn de Luiz Claudio</Heading>  </a>
    </div>
    </div> : null}
    {!!this.state.sobreRaphael ? 
    <div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 100, width: 500, float: 'left'}}>
    <Heading size={700} marginBottom={10}>Raphael Henrique Cardoso Chimello</Heading>
    </div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 150, width: 700, float: 'left'}}>
    <Heading size={500} marginBottom={10}>Idade: 19</Heading>
    <Heading size={500} marginBottom={10}>Faculdade: Universidade Anhembi Morumbi</Heading>
    <Heading size={500} marginBottom={10}>Curso: Sistemas de Informacao</Heading>
    <Heading size={500} marginBottom={10}>Empresa atual: Intel</Heading>
    <Heading size={500} marginBottom={10}>Conhecimento em linguagens de programacao: Java e JavaScript (React.js)</Heading>
    <br />
    <br />
    <a href="https://www.linkedin.com/in/raphaelchimello/"><Heading size={500} marginBottom={10}> Clique aqui e acesse o LinkedIn de Raphael Henrique</Heading> </a> 
    </div>
    </div> : null}
    </body>
    </div>
    </div>
    )}
    }