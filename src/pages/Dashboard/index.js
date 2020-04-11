import './styles.css';
import React, {Component, useState, useEffect} from 'react';
import { slide as Menu } from 'react-burger-menu';
import { HomeOutlined as HomeIcon, WechatOutlined as ChatIcon, 
    UserOutlined as UserIcon, StarOutlined as StarIcon}  from '@ant-design/icons';
import { Avatar, Modal, Button, AutoComplete } from 'antd';
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

export default class Dashboard extends Component {
    constructor(props){
    super(props);
    this.state = {
        ModalText: 'Entre em sua conta ou faca um cadastro!',
        visible: false,
        confirmLoading: false,
    };
    }
    
      showModal = () => {
            this.setState({
            visible: true,
            });
        };
    
      handleOk = () => {
        this.setState({
          ModalText: 'Redirecionando...',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      };
    
      handleCancel = () => {
        this.setState({
          visible: false,
        });
      };

    render(){
    const { visible, confirmLoading, ModalText } = this.state;
    
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
        <Button className="button" type="primary" onClick={this.showModal}> entre/cadastre-se </Button>
            <Modal
            title="Title"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            >
            <p>{ModalText}</p>
            </Modal>
        </div>
    </header>
      
    <body>
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
          <div>
              <Card className={useStyles.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
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
    </body>
    </div>
     );
     }
}


//<Avatar className="avatar" icon={<UserIcon className="icons" />}> </Avatar>