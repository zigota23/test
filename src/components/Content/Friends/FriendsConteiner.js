import React from 'react';
import Friends from './Friends.js';
import {connect} from 'react-redux';
import {follow,unfollow,getUsers} from './../../../redux/friends-reducer.js';
import {compose} from 'redux';


class FrindsConteiner extends React.Component{

	componentDidMount(){
		this.props.getUsers(this.props.count,this.props.page);
	}

	onPageChanged = (page)=>{
		this.props.getUsers(this.props.count,page); 
	}

	followUnfollow = (userId,status)=>{
		status?this.props.unfollow(userId,this.props.count,this.props.page):
			   this.props.follow(userId,this.props.count,this.props.page);	
	}

	render(){
		return(
			<Friends {...this.props} onPageChanged={this.onPageChanged} followUnfollow={this.followUnfollow}/>
		)
	} 
}



const mapStateToProps = (state)=>{
	return{
		page:state.friendsReducer.page,
		users:state.friendsReducer.users,
		pages:state.friendsReducer.pages,

	}
}





export default compose(connect(mapStateToProps,{follow,unfollow,getUsers}))(FrindsConteiner)
