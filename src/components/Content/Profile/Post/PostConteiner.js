import React from 'react';
import {connect} from 'react-redux';
import Post from './Post.js';
import {likePost} from './../../../../redux/profile-reducer.js'

const mapStateToProps = (state)=>{
	return{}
}

export default connect(mapStateToProps,{likePost})(Post);