import React from 'react';
import style from './Preloader.module.css';
import {connect} from 'react-redux';
import load from './load.svg'



const Preloader = ()=>{
  return(
      <div className={style.preloader}>
        <img src={load}/>
      </div>
    )
      

}

export default Preloader;