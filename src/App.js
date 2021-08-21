import React,{Component} from 'react';
import style from './App.module.css';
import {connect} from 'react-redux';
import NavBarConteiner from './components/NavBar/NavBarConteiner.js';
import HeaderConteiner from './components/Header/HeaderConteiner.js';
import ContentConteiner from './components/Content/ContentConteiner.js';
import {getAuthInfo} from './redux/auth-reducer.js';
import {getInitialized} from './redux/app-reducer.js';


class App extends Component{

  componentDidMount(){
    this.props.getInitialized(this.props.getAuthInfo);
  }

  render(){

    if(!this.props.initialized)return <div></div>

    return (
    <div className={style.app}>

      <div className = {style.header}>
        <HeaderConteiner />
      </div>
      
      <div className = {style.navcontent}>
        <div className = {style.navbar}><NavBarConteiner /></div>
        <div className = {style.content}><ContentConteiner /></div>
      </div>
      
    </div>
  )
  }
}


const mapStateToProps = (state)=>{
  return{
    initialized:state.appReducer.initialized
  }
}

export default connect(mapStateToProps,{getAuthInfo,getInitialized})(App);
