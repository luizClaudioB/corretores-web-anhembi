import React, { Component } from "react";
import { SearchInput, IconButton, Popover, Menu, Tab, TabNavigation } from 'evergreen-ui';
import Logo from './../../img/logo_web_svc.png';

export default class Header extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
  return (
    <div>
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
    </div>
  );}
}
