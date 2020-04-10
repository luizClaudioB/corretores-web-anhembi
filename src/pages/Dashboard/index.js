import './styles.css';
import React, {Component, useState, useEffect} from 'react';
import { slide as Menu } from 'react-burger-menu';
import { HomeOutlined as HomeIcon, WechatOutlined as ChatIcon, 
    UserOutlined as UserIcon, StarOutlined as StarIcon}  from '@ant-design/icons';
import { Avatar, Modal, Button } from 'antd';
import {Slide} from 'react-slideshow-image';


export default class Dashboard extends Component {
    constructor(props){
    super(props);
    this.state = {
        ModalText: 'Entre em sua conta ou faca um cadastro!',
        visible: false,
        confirmLoading: false,
        banner1css: {
          align: "center",
        }
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
      './../../img/homem_feliz_carro_novo.jpg',
      './../../img/homem_feliz_carro_novo.jpg',
      './../../img/homem_feliz_carro_novo.jpg'
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
        <div className="header-menu">
        </div>
        <div className='dashboard-banner-1' /*onLoad={this.banner1()}*/>
          <div className = "slide-container">
            <Slide {...properties}>
            <div className = "each-slide">
            <div style = {{'backgroundImage': `url(${slideImages[0]})`}}>
            <span > Slide 1 </span> 
            </div>
            </div> 
            <div className = "each-slide" >
            <div style = {{'backgroundImage': `url(${slideImages[1]})`}}>
            <span > Slide 2 </span> 
            </div> 
            </div> 
            <div className = "each-slide" >
            <div style = {{'backgroundImage': `url(${slideImages[2]})`}}>
            <span > Slide 3 </span>
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


//<Avatar className="avatar" icon={<UserIcon className="icons" />}> </Avatar>