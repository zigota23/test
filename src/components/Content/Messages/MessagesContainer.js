import React from 'react';
import Messages from './Messages.js';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {getUserMessages,changeFetching} from './../../../redux/messages-reducer.js';
import {withAuthRedirect} from './../../../hoc/withAuthRedirect.js';



class MessagesContainer extends React.Component{
	
	componentDidMount(){
		this.props.getUserMessages(this.props.messages);
	}

	componentWillUnmount(){
		this.props.changeFetching(false);
	}

	render(){
	 return (<Messages {...this.props}/>)
	}
}

const mapStateToProps = (state)=>{
	return{
		messages:state.messagesReducer.messages,
		isFetching:state.messagesReducer.isFetching
	}
}
export default compose(
	withAuthRedirect,
	connect(mapStateToProps,{getUserMessages,changeFetching})
	)(MessagesContainer)