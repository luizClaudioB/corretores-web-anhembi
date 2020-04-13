import './styles.css';
import React, {Component, ReactText} from 'react';
import { HomeOutlined as HomeIcon, WechatOutlined as ChatIcon, 
    UserOutlined as UserIcon, StarOutlined as StarIcon}  from '@ant-design/icons';
import Dialog from '@material-ui/core/Dialog'
import ReactModalLogin from 'react-modal-login';
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types"
import { Input, PageHeader, Rate } from 'antd';
import { SearchInput, IconButton, Button, Popover, Menu, Avatar, Combobox, Text, Textarea, TagInput,
    Pane, SideSheet, Heading, Paragraph, Tablist, Tab, Card, Table, TabNavigation, Badge, Label, toaster} from 'evergreen-ui';
import ReactStarsRating from 'react-awesome-stars-rating';
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
      filter: '',
      value: '',
      list: [],
      isaMessage: false,
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
    const loggedIn = this.state.loggedIn
    const isLoading = this.state.loading;
    const onChange = (value) => {
        console.log(`React Stars Rating value is ${value}`);
      };
    const FilterRating = ({ value }) => {
        return <ReactStarsRating onChange={onChange} value={value} />;
    };
    const VendorRating = ({ value }) => {
        return <ReactStarsRating value={5} isEdit={false} />;
      };

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
                <Menu.Item onClick={() => this.props.history.push('/profile') } icon="star-empty">Curriculos da Equipe</Menu.Item>
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
        {!!loggedIn ? 
        <Avatar
          style={{marginLeft: 1320, marginTop: 15, position: 'fixed'}}
          src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
          name="Alan Turing"
          size={40}
        />
        : 
        <Button
          style={{marginLeft: 1210, marginTop: 15, position: 'fixed'}}
          className="RML-btn"
          onClick={() => this.openModal('login')}
          appearance="minimal"
        >
        Entre ou cadastre-se
        </Button>
        }
        <ReactModalLogin
          visible={this.state.showModal}
          onCloseModal={this.closeModal.bind(this)}
          loading={isLoading}
          initialTab={this.state.initialTab}
          error={this.state.error}
          tabs={{
            afterChange: this.afterTabsChange.bind(this)
          }}
          startLoading={this.startLoading.bind(this)}
          finishLoading={this.finishLoading.bind(this)}
          form={{
            onLogin: this.onLogin.bind(this),
            onRegister: this.onRegister.bind(this),
            onRecoverPassword: this.onRecoverPassword.bind(this),

            recoverPasswordSuccessLabel: this.state.recoverPasswordSuccess
              ? {
                  label: "Uma nova senha foi enviada para seu e-mail!"
                }
              : null,
            recoverPasswordAnchor: {
              label: "Esqueceu sua senha?"
            },
            loginBtn: {
              label: "Entre"
            },
            registerBtn: {
              label: "Cadastre-se"
            },
            recoverPasswordBtn: {
              label: "Envie uma nova senha"
            },
            loginInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Password',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Password',
              }
            ],
            recoverPasswordInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
            ],
          }}
          separator={{
            label: this.state.showSocialMedia ? "ou" : "Para se cadastrar, clique no botao abaixo: "
          }}
          providers={{
            facebook: this.state.showSocialMedia ? {
              config: facebook,
              onLoginSuccess: this.onLoginSuccess.bind(this),
              onLoginFail: this.onLoginFail.bind(this),
              inactive: isLoading,
              label: "Entre com Facebook"
            } : null,
            google: this.state.showSocialMedia ? {
              config: google,
              onLoginSuccess: this.onLoginSuccess.bind(this),
              onLoginFail: this.onLoginFail.bind(this),
              inactive: isLoading,
              label: "Entre com Google"
            } : null
          }}
        />
        {loggedIn}
      </div>
    </header>
    <div>
        <TabNavigation position='fixed' backgroundColor='#E26B15' width={1500} marginLeft={-10}>
        {['Veiculos', 'Viagens', 'Empresarial', 'Residencia', 'Vida', 'Equipamentos eletronicos'].map((tab, index) => (
            <Tab color='#FFFFFF' marginLeft={130} key={tab} is="h" href="#" id={tab} isSelected={index === null}
            onSelect={() => this.props.history.push('/search')}>
            {tab}
            </Tab>
        ))}
        </TabNavigation>
    </div>
    <div>
    <body style={{position: 'fixed'}}>
    <div>
    <div style={{marginLeft: 30, marginTop: 100, width: 300, float: 'left', borderRight: '1px solid rgb(214, 206, 200)' }}>
    <Heading size={700} marginBottom={10}>Filtros</Heading>
    <TagInput
      inputProps={{ placeholder: 'Adicione filtros...' }}
      values={this.state.filterList}
      onChange={values => {
        this.setState({ filterList: values })
      }}
      style={{marginRight: 4, marginBottom: 30}}
    />
    <div> 
    <Text style={{float: 'left'}} FontFamily='display'>
    Tipo de seguro
    </Text>
    <Combobox
        openOnFocus
        items={['Automoveis', 'Aparelhos eletronicos', 'Residencia', 'Motocicletas']}
        onChange={selected => this.setState({ filter: selected })}
        placeholder="Filtre pelo tipo de seguro"
        marginBottom={30}
        style={{float: 'left'}}
    />
    <IconButton marginRight={22} style={{float: 'right'}} onClick={() => {this.onAddFilter()}} icon="plus" />
    </div> 
    <div>
    <Text style={{float: 'left'}} FontFamily='display'>
    Estado do corretor
    </Text>
    <Combobox
        openOnFocus
        items={['Sao Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Espirito Santo']}
        onChange={selected => this.setState({ filter: selected })}
        placeholder="Filtre pelo Estado do corretor"
        marginBottom={30}
        style={{float: 'left'}}
    />
    <IconButton marginRight={22} style={{float: 'right'}} onClick={() => {this.onAddFilter()}} icon="plus" />
    </div>
    <div style={{float: 'left'}}>
    <Text style={{float: 'left'}} FontFamily='display'>
    Empresa
    </Text>
    <Combobox
        openOnFocus
        items={['Porto Seguro', 'Zurich Seguros', 'Allianz', 'Bradesco Seguros']}
        onChange={selected => this.setState({ filter: selected })}
        placeholder="Filtre pelo Estado do corretor"
        marginBottom={30}
        style={{float: 'left'}}
    />
    </div>
    <div> 
    <IconButton marginRight={22} marginTop={20} style={{float: 'right'}} onClick={() => {this.onAddFilter()}} icon="plus" />
    </div>
    <div style={{float: 'left'}}>
    <Text FontFamily='display'>
    Rating do corretor
    </Text>  
    <br />
    <FilterRating></FilterRating>
    </div>
    </div>
    <div style={{float:'right'}}>
    <Heading size={700} marginBottom={10} marginLeft={100} marginTop={100}>Lista de corretores</Heading>
    <Table style={{marginLeft: 100, border: '1px solid rgb(214, 206, 200)'}}>
    <Table.Head>
        <Table.TextHeaderCell>
        Nome
        </Table.TextHeaderCell>
        <Table.TextHeaderCell>
        Tipo
        </Table.TextHeaderCell>
        <Table.TextHeaderCell>
        Avaliacao
        </Table.TextHeaderCell>
        <Table.TextHeaderCell>
        Empresa
        </Table.TextHeaderCell>
        <Table.TextHeaderCell>
        Estado
        </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240} width={800}>
        <Table.Row isSelectable onSelect={() => this.setState({ isShown: true })}>
            <Table.TextCell>Carlos Alberto</Table.TextCell>
            <Table.TextCell>Seguro de Automoveis</Table.TextCell>
            <Table.TextCell>
            <VendorRating></VendorRating>
            </Table.TextCell>
            <Table.TextCell>Porto Seguro</Table.TextCell>
            <Table.TextCell>Sao Paulo</Table.TextCell>
        </Table.Row>
        <Table.Row isSelectable onSelect={() => this.setState({ isShown: true })}>
            <Table.TextCell>Silvia Machado</Table.TextCell>
            <Table.TextCell>Seguro de Residencia</Table.TextCell>
            <Table.TextCell>
            <VendorRating></VendorRating>
            </Table.TextCell>
            <Table.TextCell>Zurich Seguros</Table.TextCell>
            <Table.TextCell>Minas Gerais</Table.TextCell>
        </Table.Row>
    </Table.Body>
    </Table>
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