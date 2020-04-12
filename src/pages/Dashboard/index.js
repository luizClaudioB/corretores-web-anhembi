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
import banner1 from './../../img/porto_auto.jpg';
import banner2 from './../../img/seguro_vida.jpg';
import banner3 from './../../img/seguro_residencia.jpg';
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

    const useStyles = makeStyles({
      root: {
        width: 100,
      },
      media: {

      },
      buttonRoot: {
        width: 50,
      },
      buttonLabel: {

      }
    });

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

      <div style={{marginTop: 28, position: 'fixed'}}>
        <div className='dashboard-banner-1'>
          <div className = "slide-container">
            <Slide {...properties}>
              <div className = "each-slide">
                <div style = {{scale: -10, 'backgroundImage': `url(${slideImages[0]})`}}>
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
      <div style = {{display: 'inline'}}>
        <div style={{display: 'inline-block', marginLeft: 45, marginTop: 50, top: 20, width: '22%', float: 'left'}}>
          <Card className = {useStyles.root}>
            <CardActionArea>
              <CardMedia 
                position = 'fixed'
                component = "img"
                height = "200"
                image = {'https://www.racecomunicacao.com.br/wp-content/uploads/2019/01/Banner-Case-AT.png'}
                title = "Allianz Travel" />
                <CardContent>
                  <Typography gutterbottom variant = "h5"component = "h2" >
                  Allianz Travel - Viagens 
                  </Typography> 
                  <Typography variant = "body2" color = "textSecondary" component = "p" >
                  Tenha uma viagem tranquila e segura, a allianz garante tudo isso para você.
                  </Typography> 
                </CardContent> 
              </CardActionArea> 
          <CardActions>
            <Button 
              size = "small" 
              style = {{width: '50%'}}
            > 
                Comprar
            </Button> 
            <Button 
              size = "small" 
              style = {{width: '50%'}}
            >
                Mais Informações 
            </Button> 
          </CardActions> 
          </Card> 
          </div>
          <div style={{display: 'inline-block', marginLeft: 50, marginTop: 50, top: 20, width: '22%', float: 'left'}}>
          <Card className = {useStyles.root}>
            <CardActionArea>
              <CardMedia 
                position = 'fixed'
                component = "img"
                height = "200" //className={useStyles.media} 
                image = {'https://www.mapfre.com.br/seguro-br/images/1200x630-logo-mapfre_tcm909-83355.jpg'}
                title = "Mapfre Seguros" />
                <CardContent>
                  <Typography gutterbottom variant = "h5"component = "h2" >
                  Mapfre - Vida
                  </Typography> 
                  <Typography variant = "body2" color = "textSecondary" component = "p" >
                  Venha para Mapfre e garanta seu seguro de vida, proteja você e sua família o quanto antes.
                  </Typography> 
                </CardContent> 
              </CardActionArea> 
          <CardActions>
             <Button 
              size = "small" 
              style = {{width: '50%'}}
            > 
                Comprar
            </Button> 
            <Button 
              size = "small" 
              style = {{width: '50%'}}
            >
                Mais Informações 
            </Button>  
          </CardActions> 
          </Card> 
          </div>  
          <div style={{display: 'inline-block', marginLeft: 50, marginTop: 50, top: 20, width: '22%', float: 'left'}}>
          <Card className = {useStyles.root}>
            <CardActionArea>
              <CardMedia 
                position = 'fixed'
                component = "img"
                height = "200" //className={useStyles.media} 
                image = {'https://suhaiseguradora.com/wp-content/uploads/featured-image-suhai.png'}
                title = "Suhai Seguradora" />
                <CardContent>
                  <Typography gutterbottom variant = "h5"component = "h2" >
                  Suhai - Veículos
                  </Typography> 
                  <Typography variant = "body2" color = "textSecondary" component = "p" >
                  Uma das melhores seguradoras e mais confiáveis, adquira já o seguro para seu veículo!
                  </Typography> 
                </CardContent> 
              </CardActionArea> 
          <CardActions>
            <Button 
              size = "small" 
              style = {{width: '50%'}}
            > 
                Comprar
            </Button> 
            <Button 
              size = "small" 
              style = {{width: '50%'}}
            >
                Mais Informações 
            </Button> 
          </CardActions> 
          </Card> 
          </div> 
      </div>
      </div>  
      </div>  
     );
     }
}


