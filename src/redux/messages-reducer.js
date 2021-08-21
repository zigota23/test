import {ProfileAPI} from './../API/api.js';
import photo_default from './../img/user.png';

const SET_INFO_MESSAGES = 'zigota/messages/SET_INFO_MESSAGES'

const initailState = {
	messages:[
	{userId:18007,userName:null,userPhoto:null,lastMessage:"Доброе утро =)"},
	{userId:18006,userName:null,userPhoto:null,lastMessage:"Доброе утро =)"},
	{userId:18005,userName:null,userPhoto:null,lastMessage:"Доброе утро =)"},
	{userId:18004,userName:null,userPhoto:null,lastMessage:"Доброе утро =)"},
	{userId:9,userName:null,userPhoto:null,lastMessage:"Доброе утро =)"},
	]
}


const messagesReducer = (state = initailState,action)=>{
	switch(action.type){

		case SET_INFO_MESSAGES:{
			return{
				...state,
				messages:action.messages
			}
		}

		default:{return state}
	}
}

const setInfoMessages = (messages)=>{
	return{type:SET_INFO_MESSAGES,messages}
}

export const getUserMessages = (messages)=> async (dispath)=>{

	let newMessages = [];

	for(let i=0;i<messages.length;i++){
		let newItem ={...messages[i]};
		let data = await ProfileAPI.getProfile(newItem.userId);
		newItem.userName=data.fullName;
		newItem.userPhoto=data.photos.small||photo_default
		newMessages.push(newItem);
	}

	dispath(setInfoMessages(newMessages))
}

export default messagesReducer;