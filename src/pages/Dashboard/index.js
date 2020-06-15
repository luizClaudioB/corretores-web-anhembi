import './styles.css';
import React, { Component } from 'react';
import {Slide} from 'react-slideshow-image';
import banner1 from './../../img/porto_auto.jpg';
import banner2 from './../../img/seguro_vida.jpg';
import banner3 from './../../img/seguro_resi.jpg';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Header from "./../../components/header-component/header.js";
import { SearchInput, IconButton, Popover, Menu, Tab, TabNavigation } from 'evergreen-ui';
import Logo from './../../img/logo_web_svc.png';

export default class Dashboard extends Component {
    constructor(props){
    super(props);
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
    }
     
    render(){
    
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
                <a href="search"> <Menu.Item icon="search">Busque Corretores</Menu.Item></a>
                <a href="profile"> <Menu.Item icon="star-empty">Curriculo da Equipe</Menu.Item></a>
                <a href="enterprise"><Menu.Item icon="info-sign">Sobre Nos</Menu.Item></a>
              </Menu.Group>
              <Menu.Divider />
            </Menu>
          }
        >
          <IconButton style={{position: 'fixed'}} className="menu-button" appearance="minimal" icon="menu" iconSize={50} />
        </Popover>
        <br />
        <br />
        <a href="/"><img style={{width: 80, marginTop: 21, 
          cursor: 'pointer', marginLeft: '48%', position: 'fixed'}} src={Logo} alt={Logo} /></a>
        <a style={{textDecoration: 'none', width: 80, marginTop: 21, 
          cursor: 'pointer', marginLeft: '35%', position: 'fixed'}} href="https://www.linkedin.com/in/lucas-bonfim-romero/"><h2>Administração
            </h2>
          </a>
        <a href="register"><label style={{width: 80, marginTop: 21, 
          cursor: 'pointer', marginLeft: '85%', position: 'fixed'}}> Cadastre-se! </label></a>
        <a href="search" style={{textDecoration: 'none', width: 80, marginTop: 21, 
          cursor: 'pointer', marginLeft: '58%', position: 'fixed'}}> <h2>Busca</h2> </a>

        </div>
      </header>
      <div>
          <TabNavigation position='fixed' backgroundColor='#7030a0' width={1500} marginLeft={-10} marginBottom={10}>
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
