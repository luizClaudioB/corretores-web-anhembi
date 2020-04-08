import './styles.css';
import React, {Component, useState, useEffect} from 'react';
import { slide as Menu } from 'react-burger-menu';
import { HomeOutlined as HomeIcon, WechatOutlined as ChatIcon, 
    UserOutlined as UserIcon, StarOutlined as StarIcon}  from '@ant-design/icons';
import { Avatar, Modal, Button } from 'antd';
import banner1 from './../../img/homem_feliz_carro_novo.jpg';
import banner2 from './../../img/homem_feliz_carro_novo.jpg';
import banner3 from './../../img/homem_feliz_carro_novo.jpg';

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
    

    /*function rollBanner(){
        if()
    }
    function banner1() {
        document.getElementById('banner1').src={banner1};
        setTimeout(() => {
            banner2();
        }, 5000);
    }    

    function banner2() {
        document.getElementById('banner2').src={banner2};
        setTimeout(() => {
            banner3();
        }, 5000);
    }    

    function banner3() {
        document.getElementById('banner3').src={banner3};
        setTimeout(() => {
            banner1();
        }, 5000);
    }    */
    render(){
    const { visible, confirmLoading, ModalText } = this.state;
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
        </div>
    </body>
    </div>
    );
    }
}


//<Avatar className="avatar" icon={<UserIcon className="icons" />}> </Avatar>