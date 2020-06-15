import './styles.css';
import 'react-calendar/dist/Calendar.css';
import React, {Component} from 'react';
import ReactModalLogin from 'react-modal-login';
import { SearchInput, IconButton, Button, Popover, Menu, Avatar, Combobox, Text, Textarea, TagInput, Icon,
     Heading, Paragraph, Tablist, Tab, Card, Table, TabNavigation, Badge, Label, toaster} from 'evergreen-ui';
import Logo from './../../img/logo_web_svc.png';

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
export default class Enterprise extends Component {
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
      sobreNos: false,
      missao: false,
      visao: false,
      valores: false,
      produtos: false,
      servicos: false,
      endereco: false,
      defaultState: true,
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
            defaultState: false,
            sobreNos: false,
            missao: false,
            visao: false,
            valores: false,
            produtos: false,
            servicos: false,
            endereco: false,
      });
    }
    
    render(){
    const loggedIn = this.state.loggedIn
    const isLoading = this.state.loading;
    
    return(
    <div className="div1"> 
    <header className="dashboard-header">
        <div>
        <Popover
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item onClick={() => this.props.history.push('/search') } icon="search">Busque Corretores</Menu.Item>
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
          cursor: 'pointer', marginLeft: '48%', position: 'fixed'}} src={Logo} alt={Logo} />
        <a style={{textDecoration: 'none', width: 80, marginTop: 21, 
          cursor: 'pointer', marginLeft: '35%', position: 'fixed'}} href="https://www.linkedin.com/in/lucas-bonfim-romero/"><h2>Administração
            </h2>
          </a>
        <label onClick={() => this.props.history.push('/register')} style={{color: '#7030a0', width: 80, marginTop: 21, 
          cursor: 'pointer', marginLeft: '85%', position: 'fixed'}}> Cadastre-se! </label>
        <a href="search" style={{textDecoration: 'none', width: 80, marginTop: 21, 
          cursor: 'pointer', marginLeft: '58%', position: 'fixed'}}> <h2>Busca</h2> </a>

        </div>
      </header>
    <div>
        <TabNavigation position='fixed' backgroundColor='#7030a0' width={1500} marginLeft={-10}>
        {['Veiculos', 'Viagens', 'Empresarial', 'Residencia', 'Vida', 'Equipamentos eletronicos'].map((tab, index) => (
            <Tab color='#FFFFFF' marginLeft={130} key={tab} is="h" href="#" id={tab} isSelected={index === null}
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
    <Heading size={700} marginBottom={20}>Sobre nós</Heading>
    <p><Button appearance="minimal" onClick={() => {this.clearAll(); this.setState({sobreNos: true})}} marginBottom={10}>Sobre a empresa </Button></p>
    <p><Button appearance="minimal" onClick={() => {this.clearAll(); this.setState({missao: true})}} marginBottom={10}>Missao </Button></p>
    <p><Button appearance="minimal" onClick={() => {this.clearAll();this.setState({visao: true})}} marginBottom={10}>Visao </Button></p>
    <p><Button appearance="minimal" onClick={() => {this.clearAll();this.setState({valores: true})}} marginBottom={10}>Valores </Button></p>
    <p><Button appearance="minimal" onClick={() => {this.clearAll();this.setState({produtos: true})}} marginBottom={10}>Produtos </Button></p>
    <p><Button appearance="minimal" onClick={() => {this.clearAll();this.setState({servicos: true})}} marginBottom={10}>Servicos </Button></p>
    <p><Button appearance="minimal" onClick={() => {this.clearAll();this.setState({endereco: true})}} marginBottom={10}>Endereco </Button></p>
    </div>
    </div>
    {!!this.state.defaultState ? 
    <div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 100, width: 600, float: 'left'}}>
    <Heading size={700} marginBottom={10}>Clique nas seções ao lado e descubra um pouco mais sobre nossa empresa!</Heading>
    <br />
    <hr />
    <br />
    <a href="https://github.com/luizClaudioB/corretores-web-anhembi"><Heading size={500} marginBottom={10}> Clique aqui e acesse o nosso <b><u>GitHub!</u></b> </Heading> </a>
    </div>
    </div> : null}
    {!!this.state.sobreNos ? 
    <div>
    <div style={{position: 'absolute', position: 'fixed', marginLeft: 400, marginTop: 100, width: 300, float: 'left'}}>
    <Heading size={700} marginBottom={10}>Sobre a empresa</Heading>
    </div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 150, width: 700, float: 'left'}}>
    <Heading size={500} marginBottom={10}>Formada a partir de um projeto proposto na faculdade, em 2020, a Só Seguros busca facilitar a busca
    por corretores de seguros disponiveis no mercado. Com os integrantes localizados em São Paulo, não possui uma sede, sendo entusiasta de novas tecnologias
    e defensora de praticas como o Home Office e Desenvolvimento Agil.</Heading>
    </div>
    </div> : null}
    {!!this.state.missao ? 
    <div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 100, width: 300, float: 'left'}}>
    <Heading size={700} marginBottom={10}>Missão</Heading>
    </div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 150, width: 700, float: 'left'}}>
    <Heading size={500} marginBottom={10}>Temos como missão a utilização de novas tecnologias e praticas para levar ao usuario
    a melhor experiencia possivel dentro do nosso site, proporcionando, desta forma, uma boa procura em busca de corretores
    disponiveis em seus Estados.</Heading>
    </div>
    </div> : null}
    {!!this.state.visao? 
    <div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 100, width: 300, float: 'left'}}>
    <Heading size={700} marginBottom={10}>Visão</Heading>
    </div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 150, width: 700, float: 'left'}}>
    <Heading size={500} marginBottom={10}>Com uma visão voltada para o futuro, nos esforçamos para sempre estarmos atualizados
    diante das novas tendencias do mercado.</Heading>
    </div>
    </div> : null}
    {!!this.state.valores ? 
    <div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 100, width: 300, float: 'left'}}>
    <Heading size={700} marginBottom={10}>Valores</Heading>
    </div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 150, width: 700, float: 'left'}}>
    <Heading size={500} marginBottom={10}>Aqui, prezamos pela etica e respeito acima de tudo. Cada membro da equipe e responsavel
    pelo outro, buscando sempre o crescimento conjunto e continuo.</Heading>
    </div>
    </div> : null}
    {!!this.state.produtos ? 
    <div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 100, width: 300, float: 'left'}}>
    <Heading size={700} marginBottom={10}>Produtos</Heading>
    </div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 150, width: 700, float: 'left'}}>
    <Heading size={500} marginBottom={10}>Ofertamos aos usuarios o Só Seguros, com foco na busca 
    facilitada por corretores de seguro disponiveis no mercado.</Heading>
    </div>
    </div> : null}
    {!!this.state.servicos ? 
    <div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 100, width: 300, float: 'left'}}>
    <Heading size={700} marginBottom={10}>Serviços</Heading>
    </div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 150, width: 700, float: 'left'}}>
    <Heading size={500} marginBottom={10}>Como citado na seção de produtos, ofertamos aos usuarios o Só Seguros, que procura facilitar
    a busca por corretores de seguro disponiveis no mercado, alem de oferecermos todo suporte em relação ao produto. </Heading>
    </div>
    </div> : null}
    {!!this.state.endereco ? 
    <div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 100, width: 300, float: 'left'}}>
    <Heading size={700} marginBottom={10}>Endereço</Heading>
    </div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 150, width: 700, float: 'left'}}>
    <Heading size={500} marginBottom={10}>A empresa ainda não possui uma sede.</Heading>
    </div>
    </div> : null}
    <img style={{width: 50, marginTop: 602,  marginLeft: 1000, position: 'fixed'}} src={Logo} alt={Logo} />
    <div style={{position: 'fixed', marginLeft: 1060, marginTop: 600, width: 500, float: 'left'}}>
    <dl>
      <dt style={{fontSize: 12}}>Só Seguros</dt>
      <dd style={{fontSize: 12}}>Busque e encontre os melhores corretores de seguros do mercado.</dd>
    </dl>
    </div>
    </body>
    </div>
    </div>
    )}
    }