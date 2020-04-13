import React, {Component} from 'react';
import Routes from './routes'
import { fileToObject } from 'antd/lib/upload/utils';
import './Global.css'



class App extends Component {
  constructor(props){
    super(props);
    
  }


render(){
  return (
    <Routes />
  );
}
}

export default App;
