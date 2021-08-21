import React from 'react';
import {connect} from 'react-redux';
import Header from './Header.js';
import {logout} from './../../redux/auth-reducer.js'


class HeaderConteiner extends React.Component{

	render(){
		return(<Header {...this.props}/>)
	}
}

let mapStateToProps = (state)=>{
	return{
		photo:state.authReducer.photo,
		login:state.authReducer.login,
		userId:state.authReducer.userId,
		isAuth:state.authReducer.isAuth
	};
}


export default connect(mapStateToProps,{logout})(HeaderConteiner);