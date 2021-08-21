import {ProfileAPI} from './../API/api.js';
import photo_default from './../img/user.png';

const SET_DIALOG = 'zigota/dialog/SET_DIALOG';

const initialState = {
	dialog:[
	{message:"sfsdfds",userId:null,userPhoto:null},
	{message:"sfsdfds",userId:"18221",userPhoto:null},
	{message:"sfsdfds",userId:null,userPhoto:null},
	{message:"sfsdfds",userId:"18221",userPhoto:null},
	{message:"sfsdfds",userId:null,userPhoto:null},
	{message:"sfsdfds",userId:"18221",userPhoto:null},
	{message:"Доброе утро =)",userId:null,userPhoto:null},

	]
}


const dialogReducer = (state = initialState,action)=>{
	switch(action.type){

		case SET_DIALOG:{
			return{
				...state,
				dialog:action.dialog
			}
		}

		default:{return state}
	}
}

const setDialog = (dialog)=>{
	return{type:SET_DIALOG,dialog}
}

export const getDialog = (userId,meId,dialog)=>async (dispath)=>{

	let newDilog = dialog.map((item)=>{
		let newId = item.userId
		if(newId != meId) newId = userId
		return {...item,userId:newId}
	})

	for(let i=0;i<dialog.length;i++){
		let data = await ProfileAPI.getProfile(newDilog[i].userId);
		newDilog[i].userPhoto = data.photos.small||photo_default;
	}

	dispath(setDialog(newDilog)); 
}

export default dialogReducer;