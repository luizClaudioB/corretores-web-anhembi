import './styles.css';
import React, {Component, ReactText} from 'react';
import { HomeOutlined as HomeIcon, WechatOutlined as ChatIcon, 
    UserOutlined as UserIcon, StarOutlined as StarIcon}  from '@ant-design/icons';
import Dialog from '@material-ui/core/Dialog'
import ReactModalLogin from 'react-modal-login';
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types"
//import { Input } from 'antd';
import { SearchInput, IconButton, Popover, Menu, Button, Avatar, Tab, TabNavigation } from 'evergreen-ui';
import {Slide} from 'react-slideshow-image';
import Logo from './../../img/logo_web_svc.png';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ButtonUI from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Input} from '@material-ui/core'
import fire from './../../config/Fire';

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
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      showModal: false,
      loggedIn: false,
      loading: false,
      error: null,
      initialTab: null,
      recoverPasswordSuccess: null,
      showSocialMedia: true,
      logged: false,
      email:"",
      password: "",
      isPressed:false
    };
    this.authListener = this.authListener.bind(this);
    }

    handlePressed = () => {
      this.setState({isPressed: true})

      if(!this.state.isPressed){
        this.setState({isPressed: true});
        }else{
        this.setState({isPressed: false});
        }
    }


    signup(e){
      e.preventDefault();
      fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      }).then((u)=>{console.log(u)})
      .catch((error) => {
          console.log(error);
        })
    }

    handleChange(e){
      this.setState({ [e.target.name ]: e.target.value });
    }

    

    logout(){
      fire.auth().signOut();
    }

    componentDidMount(){
      this.authListener();
    }

    authListener(){
      fire.auth().onAuthStateChanged((logged) => {
        console.log(logged);
        if(logged) console.log("logged");
        if(logged){
          this.setState({ logged });
          localStorage.setItem('logged', logged.uid);
        } else {
          this.setState({ logged: null });
          localStorage.removeItem('logged');
        }
      });
    }
    login(e) {
      e.preventDefault();
      fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      }).catch((error) => {
          console.log(error);
          alert("erro: revise seus dados e tente novamente")
        });
    }

    handleRegister = () => {
      this.props.history.push('/register');
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
    const logged = this.state.logged;
    
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
        textAlign: 'justify',
      },

    });

    return(
    <div className="div1"> 
    <header className="dashboard-header">
        <div>
        <Popover
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item onClick={() => this.props.history.push('/search') } icon="search">Busque Corretores</Menu.Item>
                <Menu.Item onClick={() => this.props.history.push('/history') } icon="history">
                  Historico
                </Menu.Item>
                <Menu.Item onClick={() => this.props.history.push('/profile') } icon="star-empty">Curriculo da Equipe</Menu.Item>
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
        <img onClick={() => this.props.history.push('/') } style={{width: 80, marginTop: 21, 
          cursor: 'pointer', marginLeft: 195, position: 'fixed'}} src={Logo} alt={Logo} />
        <SearchInput top={20} marginLeft={360} width={700} height={40} position="fixed" placeholder="Procure um seguro" />
        {!!logged ? 
        <Popover
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item icon="person">Meu Perfil</Menu.Item>
                <Menu.Item icon="cog">Configuracoes</Menu.Item>


                <Menu.Item icon="log-out" color="danger-." onClick={this.logout}>Logout</Menu.Item>
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
        : !this.state.isPressed ?
        <div>
        <Button
          style={{marginLeft: 1190, marginTop: 15, position: 'fixed'}}
          className="RML-btn"
          //onClick={() => this.openModal('login')}
          onClick={this.handlePressed}
          appearance="minimal"
        >
        Entre ou
        </Button>
        <Button
        style={{marginLeft: 1240, marginTop: 15, position: 'fixed'}}
        className="RML-btn"
        //onClick={() => this.openModal('login')}
        onClick={this.handleRegister}
        appearance="minimal"
      >
      Cadastre-se
      </Button>
      </div>
        :<div>
          <div style={{marginTop: 15, position: 'fixed'}}className="btnVoltar">
          <Button  onClick={this.handlePressed}> voltar </Button>
            </div>
        <div className="divLogin">
          <icon icon="arrow-left"/>
          <div>
          <icon />
          <Input marginTop={15} width={50} value={this.state.email} onChange={this.handleChange} name="email" placeholder="Email" color="primary"/>
          </div>
          <div>
          <Input color="primary"value={this.state.password} onChange={this.handleChange} type="password" name="password" placeholder="Password" />
          <div className="btLogin">
          <Button onClick={this.login} type="submit">Entrar</Button>
          </div>
          </div>

                 
        </div>
        </div>
        }
        </div>
      </header>
      <div>
          <TabNavigation position='fixed' backgroundColor='#E26B15' width={1500} marginLeft={-10} marginBottom={10}>
          {['Veiculos', 'Viagens', 'Empresarial', 'Residencia', 'Vida', 'Equipamentos eletronicos'].map((tab, index) => (
              <Tab color='#FFFFFF' marginLeft={130} key={tab} is="h" href="#" id={tab} isSelected={index === null}
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
                <div style = {{scale: -10, 'backgroundImage': `url(https://navarroconsultoriaecorretora.com/wp-content/uploads/2019/08/Banner-20AutoIndeniza-C3-A7-C3-A3o-201150x350.jpg)`}}>
                  <span></span> 
                </div>
              </div> 
              <div className = "each-slide" >
                <div style = {{'backgroundImage': `url(https://navarroconsultoriaecorretora.com/wp-content/uploads/2019/08/Banner-20Resid-C3-AAncia-20Habitual-2021150x350.jpg)`}}>
                  <span></span> 
                </div> 
              </div> 
              <div className = "each-slide" >
                <div style = {{'backgroundImage': `url(https://navarroconsultoriaecorretora.com/wp-content/uploads/2019/08/Banner-20VIDA1-201150X350-1.jpg)`}}>
                  <span></span>
                </div> 
              </div> 
            </Slide>
          </div>
        </div>
        
      <div style = {{display: 'inline'}}>
        <div style={{display: 'inline-block', marginLeft: 45, marginTop: 50, top: 20, width: '22%', float: 'left'}}>
          <Card>
            <CardActionArea>
              <CardMedia 
                position = 'fixed'
                component = "img"
                height = "80"
                image = {'https://www.racecomunicacao.com.br/wp-content/uploads/2019/01/Banner-Case-AT.png'}
                title = "Allianz Travel" />
                <CardContent>
                  <Typography variant = "body2" color = "textSecondary" component = "p" >
                  Tenha uma viagem tranquila e segura, a Allianz garante tudo isso para você.
                  </Typography> 
                </CardContent> 
              </CardActionArea> 
          </Card> 
          </div>
          <div style={{display: 'inline-block', marginLeft: 50, marginTop: 50, top: 20, width: '22%', float: 'left'}}>
          <Card className = {useStyles.root}>
            <CardActionArea>
              <CardMedia 
                position = 'fixed'
                component = "img"
                height = "80" //className={useStyles.media} 
                image = {'https://www.mapfre.com.br/seguro-br/images/1200x630-logo-mapfre_tcm909-83355.jpg'}
                title = "Mapfre Seguros" />
                <CardContent>
                  <Typography variant = "body2" color = "textSecondary" component = "p" >
                  Venha para Mapfre e garanta seu seguro de vida, proteja você e sua família o quanto antes.
                  </Typography> 
                </CardContent> 
              </CardActionArea>  
          </Card> 
          </div>  
          <div style={{display: 'inline-block', marginLeft: 50, marginTop: 50, top: 20, width: '22%', float: 'left'}}>
          <Card className = {useStyles.root}>
            <CardActionArea>
              <CardMedia 
                position = 'fixed'
                component = "img"
                height = "80" //className={useStyles.media} 
                image = {'https://suhaiseguradora.com/wp-content/uploads/featured-image-suhai.png'}
                title = "Suhai Seguradora" />
                <CardContent> 
                  <Typography variant = "body2" color = "textSecondary" component = "p" >
                  Uma das melhores seguradoras e mais confiáveis, adquira já o seguro para seu veículo!
                  </Typography> 
                </CardContent> 
              </CardActionArea> 
          </Card> 
          </div>
        </div>
      </div>  
      </div>  
     );
     }
}
