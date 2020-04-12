import './styles.css';
import React, {Component, ReactText} from 'react';
import { HomeOutlined as HomeIcon, WechatOutlined as ChatIcon, 
    UserOutlined as UserIcon, StarOutlined as StarIcon}  from '@ant-design/icons';
import Dialog from '@material-ui/core/Dialog'
import ReactModalLogin from 'react-modal-login';
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types"
import { Input } from 'antd';
import { SearchInput, IconButton, Button, Popover, Menu, Avatar, Tab, TabNavigation } from 'evergreen-ui';
import {Slide} from 'react-slideshow-image';
import banner1 from './../../img/dog_google.png';
import banner2 from './../../img/mar.png';
import banner3 from './../../img/pessoas.jpg';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ButtonUI from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
      loggedIn: true,
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
    
    const useStyles = makeStyles({
      root: {
        maxWidth: 350,
      },
      media: {
      },
    })

    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      pauseOnHover: true,
      onChange: (oldIndex, newIndex) => {
        console.log(
          `Slide transition finished from ${oldIndex} to ${newIndex}`
        );
      }
    };

    const slideImages = [
      banner1,
      banner2,
      banner3,
    ];

    return(
    <div className="div1"> 
    <header className="dashboard-header">
        <div>
        <Popover
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item icon="chat">Meus Chats</Menu.Item>
                <Menu.Item icon="star-empty">Favoritos</Menu.Item>
                <Menu.Item icon="history">
                  Historico
                </Menu.Item>
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
        <Popover
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item icon="person">Meu Perfil</Menu.Item>
                <Menu.Item icon="cog">Configuracoes</Menu.Item>
              </Menu.Group>
              <Menu.Divider />
            </Menu>
          }
        >
        <Avatar
          style={{marginLeft: 1320, marginTop: 15, position: 'fixed'}}
          src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
          name="Alan Turing"
          size={40}
        />
        </Popover>
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
        <TabNavigation position='fixed' backgroundColor='#E26B15' width={1500} marginLeft={-10} marginBottom={10}>
        {['Veiculos', 'Viagens', 'Empresarial', 'Residencia', 'Vida', 'Equipamentos eletronicos'].map((tab, index) => (
            <Tab marginLeft={130} key={tab} is="h" href="#" id={tab} isSelected={index === null}
            onSelect={() => this.props.history.push('/search')}>
            {tab}
            </Tab>
        ))}
        </TabNavigation>
    </div>
    <body style={{marginTop: 28, position: 'fixed'}}>
        <div className='dashboard-banner-1' /*onLoad={this.banner1()}*/>
          <div className = "slide-container">
            <Slide {...properties}>
              <div className = "each-slide">
                <div style = {{'backgroundImage': `url(${slideImages[0]})`}}>
                  <span></span> 
                </div>
              </div> 
              <div className = "each-slide" >
                <div style = {{'backgroundImage': `url(${slideImages[1]})`}}>
                  <span></span> 
                </div> 
              </div> 
              <div className = "each-slide" >
                <div style = {{'backgroundImage': `url(${slideImages[2]})`}}>
                  <span></span>
                </div> 
              </div> 
            </Slide>
            </div>
          </div>
    </body>
    </div>
     );
     }
}

/*
<div>
              <Card className={useStyles.root}>
                <CardActionArea>
                  <CardMedia
                    position='fixed'
                    component="img"
                    height="100"
                    //className={useStyles.media}
                    image = './../../img/hb20.png'
                    title= "O carro do ano"
                  />
                  <CardContent>
                    <Typography gutterbottom variant="h5" component="h2">
                      Hyundai HB20
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Um dos carros mais queridinhos do Brasil e o segundo mais vendido no mercado,
                      o Hyundai HB20 acaba de ganhar uma nova geração.Tanto o hatch como o sedã HB20S
                      e o aventureiro HB20X foram renovados e agora ostentam um visual e interior mais modernos,
                      lista de equipamentos mais recheada e a opção de motor turbo com injeção direta.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size = "small" color = "primary">
                    Comprar
                  </Button>
                  <Button size = "small" color = "primary">
                    Mais Informações
                  </Button>
                </CardActions>
              </Card>
          </div>
          */
