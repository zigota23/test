import React from 'react';
import Login from './Login.js';
import {login} from './../../../redux/auth-reducer.js';
import {connect} from 'react-redux';



class LoginContainer extends React.Component{



	render(){
		return <Login{...this.props}/>
	}
}


const mapSateToProps = (state)=>{

	return {
		isAuth:state.authReducer.isAuth,
		userId:state.authReducer.userId			
	}
}



export default connect(mapSateToProps,{login})(LoginContainer)