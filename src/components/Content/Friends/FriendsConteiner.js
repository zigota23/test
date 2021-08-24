import React from 'react';
import Friends from './Friends.js';
import {connect} from 'react-redux';
import {follow,unfollow,getUsers,changeFetching,getFriends,changeTerm,changeOnlyFriends} from './../../../redux/friends-reducer.js';
import {compose} from 'redux';


class FrindsConteiner extends React.Component{

	componentDidMount(){
		if(this.props.onlyFriends)this.props.getFriends(this.props.term);
		else{this.props.getUsers(this.props.count,this.props.page,this.props.term)}
	}
	
	componentDidUpdate(prevProps,prevState){
		if(prevProps.onlyFriends !== this.props.onlyFriends){
			if(this.props.onlyFriends)this.props.getFriends(this.props.term);
			else{this.props.getUsers(this.props.count,this.props.page,this.props.term)}
		}
	}

	onPageChanged = (page)=>{
		if(this.props.onlyFriends)this.props.getFriends(this.props.term);
		else{this.props.getUsers(this.props.count,page,this.props.term)}
	}

	onChangeSearch = (e)=>{
		this.props.changeTerm(e.target.value);
	}

	followUnfollow = (userId,status)=>{
		status?this.props.unfollow(userId,this.props.count,this.props.page,this.props.term):
			   this.props.follow(userId,this.props.count,this.props.page,this.props.term);	
	}

	changeOnlyFriends = (e)=>{
		this.props.changeOnlyFriends(e.target.checked)
	}

	OnClickSearch = ()=>{
		if(this.props.onlyFriends)this.props.getFriends(this.props.term);
		else{this.props.getUsers(this.props.count,this.props.page,this.props.term)}
	}

	componentWillUnmount(){
		this.props.changeFetching(false)
	}

	render(){
		return(
			<Friends {...this.props} onPageChanged={this.onPageChanged} followUnfollow={this.followUnfollow} 
			onChangeSearch={this.onChangeSearch} changeOnlyFriends={this.changeOnlyFriends} OnClickSearch={this.OnClickSearch}/>
		)
	} 
}



const mapStateToProps = (state)=>{
	return{
		page:state.friendsReducer.page,
		users:state.friendsReducer.users,
		pages:state.friendsReducer.pages,
		term:state.friendsReducer.term,
		isFetching:state.friendsReducer.isFetching,
		onlyFriends:state.friendsReducer.onlyFriends,
	}
}





export default compose(connect(mapStateToProps,{follow,unfollow,getUsers,changeFetching,getFriends,changeTerm,changeOnlyFriends}))(FrindsConteiner)
