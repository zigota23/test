import React from 'react';
import {connect} from 'react-redux';
import NavBar from './NavBar.js';

const mapStateToProps = (state)=>{
	return{
		userId:state.authReducer.userId,
	}
}

const NavBarConteiner = connect(mapStateToProps,{})(NavBar);

export default NavBarConteiner;