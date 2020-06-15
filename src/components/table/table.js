import React from 'react';
import styles from './styles.css';
export default class Table extends React.Component {
    
    constructor(props){
      super(props);
      this.getHeader = this.getHeader.bind(this);
      this.getRowsData = this.getRowsData.bind(this);
      this.getKeys = this.getKeys.bind(this);
    }
    
    getKeys = function(){
      if(this.props.data[0]){
      return Object.keys(this.props.data[0]);
      }
      else{
          return null;
      }
    }
    
    getHeader = function(){
      if(this.props.data[0]){
      var keys = this.getKeys();
      return keys.map((key, index)=>{
        return <th key={key}>{key.toUpperCase()}</th>
      })
        }
        else{
            return null;
        }
    }
    
    getRowsData = function(){
      if(this.props.data[0]){
      var items = this.props.data;
      var keys = this.getKeys();
      return items.map((row, index)=>{
        return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
      })
        }
        else{
            return "Não foi possivel encontrar um corretor. Resete os filtros!"
        }
    }
    
    render() {
        return (
          <div>
            <div>
            <table style={styles}>
            <thead>
              <tr>{this.getHeader()}</tr>
            </thead>
            <tbody>
              {this.getRowsData()}
            </tbody>
            </table>
            </div>
          </div>
        );
    }
}

const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
  })
}