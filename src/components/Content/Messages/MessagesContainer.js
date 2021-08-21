import React from 'react';
import Messages from './Messages.js';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {getUserMessages} from './../../../redux/messages-reducer.js';


class MessagesContainer extends React.Component{
	
	componentDidMount(){
		this.props.getUserMessages(this.props.messages);
	}

	render(){
	 return (<Messages {...this.props}/>)
	}
}

const mapStateToProps = (state)=>{
	return{
		messages:state.messagesReducer.messages
	}
}
export default compose(connect(mapStateToProps,{getUserMessages}))(MessagesContainer)