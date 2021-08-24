import React from 'react';
import style from './Post.module.css';
import {connect} from 'react-redux';
import {likePost} from './../../../../redux/profile-reducer.js';


const Post = (props)=>{

	const onClickLike = ()=>{
		return props.likePost(props.id)
	}

	return(
		<div className={style.posts}>
			<div className={style.user}>
				<div className={style.user_photo}><img src={props.photo}/></div>
				<div className={style.user_name}>{props.name}</div>
			</div>
			<div className={style.post}>{props.text}</div>
			<div className={style.like}>
				<div className={style.button_like}><button onClick={onClickLike}>{'\u2764'}</button></div>
				<div className={style.count_like}>{props.like}</div>
			</div>
			
		</div>
	)
}

const mapStateToProps = (state)=>{
	return{}
}

export default connect(mapStateToProps,{likePost})(Post);