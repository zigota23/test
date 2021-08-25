import React,{useState,useEffect} from 'react';
import style from './Profile.module.css';
import {Field,reduxForm,reset} from 'redux-form';
import {withRouter,Redirect} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Post from './Post/Post.js';
import {addNewPost,getProfile,updateStatus,changeFetching,changePhoto} from './../../../redux/profile-reducer.js';
import {withAuthRedirect} from './../../../hoc/withAuthRedirect.js';
import Preloader from './../../../hoc/Preloader/Preloader.js';


const afterSubmit = (result, dispatch) => dispatch(reset('post'));

const PostForm = (props)=>{
	return(
		<form onSubmit={props.handleSubmit}>
			<div className={style.text_new_post}>
				<Field name='post' className={style.post_field} component='textarea'/>
			</div>
			<button type='submit' className={style.send_post}>Отправить</button>
		</form>
		)
}
const PostFormRedux = reduxForm({form:'post',onSubmitSuccess:afterSubmit})(PostForm);






const Profile = (props)=>{
	let [editMode,setEditMode]=useState(false);
	let [status,setStatus]=useState(props.about_user);

	useEffect(()=>{
		props.getProfile(props.match.params.userId);
		return ()=>{props.changeFetching(false)}
	},[]);
	useEffect(()=>{props.getProfile(props.match.params.userId)},[props.match.params.userId]);
	useEffect(()=>{setStatus(props.about_user)},[props.about_user]);
	useEffect(()=>{},[props.isFetching])


	let arrPosts = props.posts.map((el,index)=>{
		return <Post name={el.user.name} photo={el.user.photo} like={el.like} text={el.post_text} id={index}/>
	})

	const onSubmit = (data)=>{
		debugger
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

	const recieveNewPhoto = (e)=>{
		console.log(e.target.files[0].type.indexOf('image'))
		if(e.target.files[0].type.indexOf('image') !== -1)props.changePhoto(e.target.files[0]);
		else{alert("Добавте коректный тип файла")}
	}

	const isStyleNone = (className)=>{
		if(props.match.params.userId == props.meId)return className
		 return style.none
	}

	if(!props.isFetching)return <Preloader/>

	return(
		<div>
			<div className={style.user_info}>
				<div className={style.user_photo}>
					<img src={props.photo_user}/>
					<div className={style.new_photo_load}>
						<label htmlFor={style.load_photo} className={isStyleNone(style.label_load_photo)}>Редактировать фото</label>
						<input multiple={false} type='file' id={style.load_photo} className={style.load_photo} onChange={recieveNewPhoto}></input>
					</div>
				</div>
				<div className={style.about_user}>
					<div className={style.user_name}>{props.name}</div>
					<div className={style.user_about_user}>
					About me:&nbsp;{!editMode?<span onDoubleClick={changeEditMode}>{props.about_user}</span>:
									<input value={status} autoFocus={true} onChange={changeStatus} onBlur={saveStatus} type='text'/>}
					</div>
				</div>
			</div>
			<div className={isStyleNone(style.new_post)}>
				<PostFormRedux onSubmit={onSubmit}/>
			</div>

			<div className={isStyleNone(style.posts)}>{arrPosts}</div>

		</div>
		);
}



const mapStateToProps = (state)=>{
	      
	return{
		name:state.profileReducer.user.name,
		about_user:state.profileReducer.user.about_user,
		photo_user:state.profileReducer.user.photo,
		posts: state.profileReducer.posts,
		isFetching:state.profileReducer.isFetching,
		meId:state.authReducer.userId,
	};
}


export default compose(
	withAuthRedirect,
	withRouter,
	connect(mapStateToProps,{addNewPost,getProfile,updateStatus,changeFetching,changePhoto}),
	)(Profile);
