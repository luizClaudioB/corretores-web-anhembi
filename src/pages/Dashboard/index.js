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
    <Header></Header>
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
