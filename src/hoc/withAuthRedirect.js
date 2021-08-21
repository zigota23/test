import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = (state)=>{
	return{
		isAuth:state.authReducer.isAuth
	}
}

export const withAuthRedirect = (Component)=>{

	class AuthRedirect extends React.Component{

		render(){
		if(!this.props.isAuth){return <Redirect to='/login'/>}

		return (<Component/>)
		}
	}

	return connect(mapStateToProps,{})(AuthRedirect)

}