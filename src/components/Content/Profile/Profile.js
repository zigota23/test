import React,{useState,useEffect} from 'react';
import style from './Profile.module.css';
import {Field,reduxForm} from 'redux-form';
import {withRouter,Redirect} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';

import PostConteiner from './Post/PostConteiner.js';
import {addNewPost,getProfile,updateStatus} from './../../../redux/profile-reducer.js';
import {withAuthRedirect} from './../../../hoc/withAuthRedirect.js';


const PostForm = (props)=>{
	return(
		<form onSubmit={props.handleSubmit}>
			<div className={style.text_new_post}>
				<Field name='post' component='textarea'/>
			</div>
			<button type='submit' className={style.send_post}>Отправить</button>
		</form>
		)
}
const PostFormRedux = reduxForm({form:'post'})(PostForm);






const Profile = (props)=>{
	let [editMode,setEditMode]=useState(false);
	let [status,setStatus]=useState(props.about_user);

	useEffect(()=>{props.getProfile(props.match.params.userId)},[]);
	useEffect(()=>{props.getProfile(props.match.params.userId)},[props.match.params.userId]);
	useEffect(()=>{setStatus(props.about_user)},[props.about_user]);


	let arrPosts = props.posts.map((el,index)=>{
		return <PostConteiner name={el.user.name} photo={el.user.photo} like={el.like} text={el.post_text} id={index}/>
	})

	const onSubmit = (data)=>{
		props.addNewPost(data.post)
	}

	const changeEditMode = ()=>{
		setEditMode(!editMode)
	}

	const changeStatus = (e)=>{
		setStatus(e.target.value)
	}

	const saveStatus = (e)=>{
		props.updateStatus(e.target.value);
		changeEditMode();
	}

	return(
		<div>
			<div className={style.user_info}>
				<div className={style.user_photo}>
					<img src={props.photo_user}/>
				</div>
				<div className={style.about_user}>
					<div className={style.user_name}>{props.name}</div>
					<div className={style.user_about_user}>
					About me:&nbsp;{!editMode?<span onDoubleClick={changeEditMode}>{props.about_user}</span>:
									<input value={status} autoFocus={true} onChange={changeStatus} onBlur={saveStatus} type='text'/>}
					</div>
				</div>
			</div>
			<div className={style.new_post}>
				<PostFormRedux onSubmit={onSubmit}/>
			</div>

			<div>{arrPosts}</div>

		</div>
		);
}



const mapStateToProps = (state)=>{
	      
	return{
		name:state.profileReducer.user.name,
		about_user:state.profileReducer.user.about_user,
		photo_user:state.profileReducer.user.photo,
		posts: state.profileReducer.posts,
	};
}


export default compose(
	withAuthRedirect,
	withRouter,
	connect(mapStateToProps,{addNewPost,getProfile,updateStatus}),
	)(Profile);
