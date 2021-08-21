import React from 'react';
import Message from './Message.js';
import {compose} from 'redux';
import {connect} from 'react-redux';


class MessageContainer extends React.Component{


 render(){
 	return (<Message {...this.props}/>)
 }
}

const mapStateToProps = (state)=>{
	return{}
}
export default compose(connect(mapStateToProps,{}))(MessageContainer)


