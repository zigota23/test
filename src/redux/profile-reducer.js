import {ProfileAPI} from './../API/api.js';
import photo_default from './../img/user.png';

const UPDATE_NEW_POST_TEXT = "zigota/profile/UPDATE_NEW_POST_TEXT";
const ADD_NEW_POST = 'zigota/profile/ADD_NEW_POST';
const LIKE_POST = 'zigota/profile/LIKE_POST';
const SET_PROFILE = 'zigota/profile/SET_PROFILE';
const SET_STATUS = 'zigota/profile/SET_STATUS';
const SET_IS_FETCHING = 'zigota/profile/SET_IS_FETCHING';

const initialState = {
	user:{
		name:null,
		about_user:null,
		photo:null,
 	},
	posts:[],
	isFetching:false
}


const profileReducer = (state = initialState,action)=>{
	
	switch(action.type){
		
		case ADD_NEW_POST:{
			
			return{...state,
				posts:[...state.posts,{post_text:action.post_text,user:{name:state.user.name,photo:state.user.photo},like:0}]}
		}
		case LIKE_POST:{

			return{...state,posts:state.posts.map((el,index)=>{
				if(index === action.id) el.like++;
				return el
			})}
		}

		case SET_PROFILE:{
			return{
				...state,
				user:{...state.user,
					name:action.profile.fullName,
					photo:action.profile.photos.large?action.profile.photos.large:photo_default,
				}
			}
		}

		case SET_STATUS:{
			return{
				...state,
				user:{...state.user,about_user:action.status}
			}
		}

		case SET_IS_FETCHING:{
			return{
				...state,
				isFetching:action.status
			}
		}
		default: return state
	}
}


export const addNewPost = (post_text)=>{
	return{type:ADD_NEW_POST,post_text}
}

export const likePost = (id)=>{
	return{type:LIKE_POST,id}
}

const setProfile = (profile)=>{
	return{type:SET_PROFILE,profile}
}

const setStatus = (status)=>{
	return{type:SET_STATUS,status}
}

export const changeFetching = (status)=>{
	return{type:SET_IS_FETCHING,status}
} 

export const getProfile = (userId)=> async (dispatch)=>{
	const data = await ProfileAPI.getProfile(userId);
	console.log(data);
	dispatch(setProfile(data));
	dispatch(getStstus(userId));
	dispatch(changeFetching(true));
}

const getStstus = (userId)=> async (dispatch)=>{
	const data = await ProfileAPI.getStatus(userId);
	dispatch(setStatus(data));
}

export const updateStatus = (status)=>(dispatch)=>{
	dispatch(setStatus(status));
	ProfileAPI.setStatus(status);
}


export default profileReducer;