import './styles.css';
import 'react-calendar/dist/Calendar.css';
import React, { Component} from 'react';
import { Button, Heading } from 'evergreen-ui';
import Logo from './../../img/logo_web_svc.png';
import Header from "./../../components/header-component/header.js";

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
      defaultState: true,
    };
    }

    clearAll(){
        this.setState({
        defaultState: false,
        sobreLucas: false,
        sobreLuiz: false,
        sobreRaphael: false,
      });
    }
    
    render(){

    return(
    <div className="div1"> 
    <Header></Header>
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
    {!!this.state.defaultState ? 
    <div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 100, width: 600, float: 'left'}}>
    <Heading size={700} marginBottom={10}>Clique nos nomes ao lado e descubra um pouco mais sobre nossos integrantes!</Heading>
    </div>
    </div> : null}
    {!!this.state.sobreLucas ? 
    <div>
    <div style={{position: 'absolute', position: 'fixed', marginLeft: 400, marginTop: 100, width: 500, float: 'left'}}>
    <Heading size={700} marginBottom={10}>Lucas Henrique Bonfim Romero</Heading>
    </div>
    <div style={{position: 'fixed', marginLeft: 400, marginTop: 150, width: 700, float: 'left'}}>
    <ul>
    <li><Heading size={500} marginBottom={10}>Idade: 20</Heading></li>
    <li><Heading size={500} marginBottom={10}>Faculdade: Universidade Anhembi Morumbi</Heading></li>
    <li><Heading size={500} marginBottom={10}>Curso: Sistemas de Informacao</Heading></li>
    <li><Heading size={500} marginBottom={10}>Empresa atual: Tenbu</Heading></li>
    <li><Heading size={500} marginBottom={10}>Conhecimento em linguagens de programacao:  <ol><li>Java</li><li>PHP</li><li>JavaScript (React.js)</li></ol></Heading></li>
    </ul>
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
    <ul>
    <li><Heading size={500} marginBottom={10}>Idade: 20</Heading></li>
    <li><Heading size={500} marginBottom={10}>Faculdade: Universidade Anhembi Morumbi</Heading></li>
    <li><Heading size={500} marginBottom={10}>Curso: Sistemas de Informacao</Heading></li>
    <li><Heading size={500} marginBottom={10}>Empresa atual: IBM</Heading></li>
    <li><Heading size={500} marginBottom={10}>Conhecimento em linguagens de programacao: <ol><li>Java (SpringBoot)</li><li>JavaScript (React.js)</li></ol></Heading></li>
    </ul>
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
    <ul>
    <li><Heading size={500} marginBottom={10}>Idade: 19</Heading></li>
    <li><Heading size={500} marginBottom={10}>Faculdade: Universidade Anhembi Morumbi</Heading></li>
    <li><Heading size={500} marginBottom={10}>Curso: Sistemas de Informacao</Heading></li>
    <li><Heading size={500} marginBottom={10}>Empresa atual: Intel</Heading></li>
    <li><Heading size={500} marginBottom={10}>Conhecimento em linguagens de programacao: <ol><li>Java</li><li>Python</li><li>JavaScript (React.js)</li></ol></Heading></li>
    </ul>
    <br />
    <br />
    <a href="https://www.linkedin.com/in/raphaelchimello/"><Heading size={500} marginBottom={10}> Clique aqui e acesse o LinkedIn de Raphael Henrique</Heading> </a> 
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