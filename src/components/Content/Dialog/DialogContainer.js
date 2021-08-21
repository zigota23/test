import React from 'react';
import Dialog from './Dialog.js';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {getDialog} from './../../../redux/dialog-reducer.js'


class DialogContainer extends React.Component{

	componentDidMount(){
		
		this.props.getDialog(this.props.match.params.userId,this.props.meId,this.props.dialog)
	}

	render(){
		return <Dialog {...this.props}/>
	}
}

const mapStateToProps = (state)=>{
	return{
		dialog:state.dialogReducer.dialog,
		meId:state.authReducer.userId,
	}
}


export default compose(
	withRouter,
	connect(mapStateToProps,{getDialog})
	)(DialogContainer)