import './styles.css';
import React, { Component } from 'react';
import {  IconButton, Button, Popover, Menu, Avatar, Combobox, Text, Textarea, TagInput,
    Pane, SideSheet, Heading, Paragraph, Tablist, Tab, Card, TabNavigation, Badge, Label, toaster,
    } from 'evergreen-ui';
import Logo from './../../img/logo_web_svc.png';
import Header from "./../../components/header-component/header.js";
import getCorretores from '../../services/corretoresService';
import Table from './../../components/table/table.js';

export default class SearchPage extends Component {
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
      filterList: [],
      filterEstado: '',
      filterEmpresa: '',
      filterTipo: '',
      value: '',
      list: [],
      isaMessage: false,
      corretores: [],
      showTable: false,
    };
    }

    componentDidMount(){
      this.getCorretor();
      };

      getCorretor() {
            getCorretores.SearchCorretores().then((res) =>{
                console.log("resposta", res.data.body)
                let corretores = res.data.body;
                //mudando estado
                this.setState({
                    corretores: corretores,
                    showTable: true,
                })
                console.log(this.state.corretores);
            })
      }
      
      getCorretorByEstado(estado){
        this.setState({
          corretores: this.state.corretores.filter(corretores => corretores.estado === estado),
          showTable: true,
        })
      }

      getCorretorByEmpresa(empresa){
        this.setState({
          corretores: this.state.corretores.filter(corretores => corretores.empresa === empresa),
          showTable: true,
        })
      }

      getCorretorByTipo(tipo_seg){
          this.setState({
            corretores: this.state.corretores.filter(corretores => corretores.tipo_seg === tipo_seg),
            showTable: true,
          })
      }      

    onAddMessage = () => {
      this.setState({isaMessage: true })
      this.setState(state => {
        const list = [...state.list, state.value];
        return {
          list,
          value: '',
        };
      });
    };

    onAddFilter = () => {
      this.setState(state => {
        const filterList = [...state.filterList, state.filter];
        return {
          filterList,
          filter: '',
        };
      });
    };
    
    render(){
    return(
    <div className="div1"> 
    <div>
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
          cursor: 'pointer', marginLeft: '48%', position: 'fixed'}} src={Logo} alt={Logo} />
        <a style={{width: 80, marginTop: 21, 
          cursor: 'pointer', marginLeft: '35%', position: 'fixed'}} href="https://www.linkedin.com/in/lucas-bonfim-romero/"><h2>Administração
            </h2>
          </a>
        <label onClick={() => this.props.history.push('/register')} style={{width: 80, marginTop: 21, 
          cursor: 'pointer', marginLeft: '85%', position: 'fixed'}}> Cadastre-se! </label>
        <a style={{width: 80, marginTop: 21, 
          cursor: 'pointer', marginLeft: '58%', position: 'fixed'}}> Busca </a>

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
    </div>
    <div>
      <body style={{marginTop: 100, position: 'fixed'}}>
      <div>
      <div style={{marginLeft: 30, width: 300, float: 'left', borderRight: '1px solid rgb(214, 206, 200)' }}>
      <Heading size={700} marginBottom={10}>Filtros</Heading>
      <div> 
      <Text style={{float: 'left'}} FontFamily='display'>
      Tipo de seguro
      </Text>
      <Combobox
          openOnFocus
          items={['Automoveis', 'Vida', 'Residencia', 'Equipamentos Eletronicos', 'Viagens', 'Empresarial']}
          onChange={selected => this.setState({ filterTipo: selected })}
          placeholder="Filtre pelo tipo de seguro"
          marginBottom={30}
          style={{float: 'left'}}
      />
      <IconButton marginRight={22} style={{float: 'right'}} 
        onClick={() => {this.getCorretorByTipo(this.state.filterTipo)}} icon="plus" />
      </div> 
      <div>
      <Text style={{float: 'left'}} FontFamily='display'>
      Estado do corretor
      </Text>
      <Combobox
          openOnFocus
          items={['SP', 'RJ', 'MG', 'ES']}
          onChange={selected => this.setState({ filterEstado: selected })}
          placeholder="Filtre pelo Estado do corretor"
          marginBottom={30}
          style={{float: 'left'}}
      />
      <IconButton marginRight={22} style={{float: 'right'}} 
        onClick={() => {this.getCorretorByEstado(this.state.filterEstado)}} icon="plus" />
      </div>
      <div style={{float: 'left'}}>
      <Text style={{float: 'left'}} FontFamily='display'>
      Empresa
      </Text>
      <Combobox
          openOnFocus
          items={['Porto Seguro', 'Zurich Seguros', 'Allianz', 'Bradesco Seguros']}
          onChange={selected => this.setState({ filterEmpresa: selected })}
          placeholder="Filtre pelo Estado do corretor"
          marginBottom={30}
          style={{float: 'left'}}
      />
      <Button onClick={() => {this.getCorretor()}}>Resetar filtros</Button>
      </div>
      <div> 
      <IconButton marginRight={22} marginTop={20} style={{float: 'right'}} 
        onClick={() => {this.getCorretorByEmpresa(this.state.filterEmpresa)}} icon="plus" />
      </div>
      </div>
      <div style={{float:'right'}}>
      <Heading size={700} marginBottom={10} marginLeft={100}>Lista de corretores</Heading>
      {this.state.showTable === true ?
      <div>

      <Table data={this.state.corretores}/>
      </div>
      : null }
      </div>
      </div>
      <div>
      <React.Fragment>
        <SideSheet
          isShown={this.state.isShown}
          onCloseComplete={() => this.setState({ isShown: false })}
          containerProps={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
          }}
        >
          <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
            <Pane padding={16} borderBottom="muted">
              <Heading size={600}>
              Carlos Alberto
              <Badge color="neutral" marginBottom={1} marginLeft={2} marginRight={8}>Corretor Premium</Badge>
              </Heading>
              <Paragraph size={400} color="muted">
                Informacoes sobre o(a) corretor(a)
              </Paragraph>
            </Pane>
            <Pane display="flex" padding={8}>
              <Tablist>
                {['Perfil', 'Contato'].map(
                    (tab, index) => (
                      <Tab
                        key={tab}
                        isSelected={this.state.selectedIndex === index}
                        onSelect={() => this.setState({ selectedIndex: index })}
                      >
                        {tab}
                      </Tab>
                    )
                  )}

              </Tablist>
            </Pane>
          </Pane>
          {this.state.selectedIndex === 0 ?
          <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
            <Card
              backgroundColor="white"
              elevation={0}
              height={100}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <div>
              <p>
              <Text>Tipo:   </Text>
              <Text>Seguro de Automoveis</Text>
              </p>
              <p>
              <Text>Empresa:   </Text>
              <Text>Porto Seguro</Text>
              </p>
              <p>
              <Text>Estado:   </Text>
              <Text>Sao Paulo</Text>
              </p>
              </div>
            </Card>
            <br />
            <Label
              htmlFor="textarea-2"
              marginBottom={4}
              display="block"
            >
              <br />
              Ultimos comentarios sobre este corretor:
            </Label>
            <Textarea
              appearance='minimal'
              value={this.state.list[0]}
              disabled={true}
              style={{resize: 'none'}}
            /> 
            <br />
            <br />
            <Textarea
              value={this.state.list[1]}
              disabled={true}
              style={{resize: 'none'}}
            />
            <br />
            <br />
            <Textarea
              value={this.state.list[2]}
              disabled={true}
              style={{resize: 'none'}}
            />
          </Pane>
          : <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
          <Card
            backgroundColor="white"
            elevation={0}
            height={100}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <div>
            <p>
            <Text>Telefone celular: </Text>
            <Text>(11) 98765-4321</Text>
            </p>
            <p>
            <Text>Correio eletronico: </Text>
            <Text>carlosalberto@portoseguro.br</Text>
            </p>
            <p>
            <Text>Disponibilidade: </Text>
            <Text>Segunda a sexta das 10h as 18h</Text>
            </p>
            </div>
            </Card>
            <Pane>
            <Label
              htmlFor="textarea-2"
              marginBottom={4}
              display="block"
            >
              <br />
              Deixe uma mensagem para o corretor
            </Label>
            <Textarea
              required
              onChange={e => this.setState({ value: e.target.value })}
              value={this.state.value}
              placeholder="Escreva aqui sua mensagem..."
              style={{resize: 'none'}}
            />
            <Button style={{marginLeft: 520, marginTop: 1}} onClick={() => {this.onAddMessage(); 
              toaster.success('Sua mensagem foi enviada!', {duration: 4})}}>Enviar</Button>
          </Pane>
          </Pane> }
        </SideSheet>
      </React.Fragment>   
      </div>
      <img style={{width: 50, marginTop: 602,  marginLeft: 669, position: 'fixed'}} src={Logo} alt={Logo} />
      <div style={{position: 'fixed', marginLeft: 1060, marginTop: 600, width: 500, float: 'left'}}>
      <dl>
        <dt style={{fontSize: 12}}>Só Seguros</dt>
        <dd style={{fontSize: 12}}>Busque e encontre os melhores corretores de seguros do mercado.</dd>
      </dl>
      </div>
      </body>
    </div>
    </div>
    );
    }
}