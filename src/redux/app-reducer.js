import {AuthAPI} from './../API/api.js';

const SET_INITIALIZED = "zigota/app/SET_INITIALIZED"

const initialState = {
	initialized: false
}


const appReducer = (state = initialState , action)=>{
	switch(action.type){

		case(SET_INITIALIZED):{
			return{
				...state,
				initialized:true
			}
		}

		default: {return state}
	}
}


const setInitialized = ()=>{
	return{type:SET_INITIALIZED}
}

export const getInitialized = (getAuthInfo)=>(dispatch)=>{
	getAuthInfo().then(response=>{
		dispatch(setInitialized())
	})
}

export default appReducer;