import {AuthAPI,ProfileAPI} from './../API/api.js';
import {stopSubmit} from 'redux-form';


const SET_AUTH_INFO = 'zigota/auth/SET_AUTH_INFO';

const initialState = {
	userId:null,
	email:null,
	login:null,
	photo:null,
	isAuth:false
}


const authReducer = (state = initialState,action)=>{
	switch(action.type){

		case SET_AUTH_INFO:{
			return{
				...state,
				...action.data
			}
		}

		default:return state
	}
}

const setAuthInfo = (data)=>{
	return{type:SET_AUTH_INFO,data}
}

export const getAuthInfo = ()=>(dispatch)=>{
	return AuthAPI.authMe().then(data=>{
		if(data.resultCode === 0){
			dispatch(setAuthInfo({userId:data.data.id,email:data.data.email,login:data.data.login,isAuth:true}));
			dispatch(getUserPhoto(data.data.id));
		}
	})
}

const getUserPhoto = (userId)=> async (dispatch)=>{
	const data = await ProfileAPI.getProfile(userId);
	dispatch(setAuthInfo({photo:data.photos.small}))
}


export const login = (email,password,rememberMe)=> async (dispatch)=>{
	const data = await AuthAPI.login(email,password,rememberMe);
	switch(data.resultCode){
			case 0:{
				dispatch(getAuthInfo());
			}
			default:{
				dispatch(stopSubmit('login',{_error:data.messages[0]}))
			}

		}
}

export const logout = ()=>(dispatch)=>{
	AuthAPI.logout();
	dispatch(setAuthInfo({userId:null,email:null,login:null,isAuth:false}));
}



export default authReducer;