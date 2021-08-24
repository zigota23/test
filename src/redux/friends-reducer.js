import {UsersAPI} from './../API/api.js';

const SET_USERS = 'zigota/friends/SET_USERS';
const SET_TOTAL_COUNT ='zigota/friends/SET_TOTAL_COUNT';
const SET_PAGE = 'zigota/friends/SET_PAGE';
const SET_PAGES = 'zigota/friends/SET_PAGES';
const SET_IS_FETCHING = 'zigota/friends/SET_IS_FETCHING';
const SET_TERM = 'zigota/friends/SET_TERM';
const SET_ONLY_FRIENDS = 'zigota/friends/SET_ONLY_FRIENDS';

const initialState = {
	users:[],
	pages:[],
	totalCount:null,
	count:20,
	page:1,
	isFetching:false,
	term:'',
	onlyFriends:false,
}

const friendsReducer = (state = initialState , action)=>{
	switch(action.type){

		case SET_USERS:{
			return{
				...state,
				users:action.users
			}
		}

		case SET_TOTAL_COUNT:{
			return{
				...state,
				totalCount:action.totalCount
			}
		}
		case SET_PAGE:{
			return{
				...state,
				page:action.page
			}
		}

		case SET_PAGES:{
			let pages = [];
			const countPages = Math.ceil(state.totalCount/state.count);
			
			action.page-10<=0?action.page=1:action.page-=10;
			for(let i = action.page; i <= countPages ;i++){
				if(i>action.page+20)break;
				pages.push(i);
			}
			if(pages[0] !== 1)pages.unshift("...");
			if(pages[-1] !== countPages)pages.push("...");
			return{
				...state,
				pages:pages
			}
		}

		case SET_IS_FETCHING:{
			return{
				...state,
				isFetching:action.status,
			}
		}

		case SET_TERM:{
			return{
				...state,
				term:action.text
			}
		}

		case SET_ONLY_FRIENDS:{
			return{
				...state,
				onlyFriends:action.status
			}
		}
		default: return state;
	}
}



 const setUsers = (users)=>{
	return{type:SET_USERS,users}
}
 const setTotalCount = (totalCount)=>{
	return{type:SET_TOTAL_COUNT,totalCount}
}
 const setPage = (page)=>{
	return{type:SET_PAGE,page}
}
 const setPages = (page)=>{
	return{type:SET_PAGES,page}
}

export const changeTerm = (text)=>{
	return{type:SET_TERM,text}
}

export const changeOnlyFriends =(status)=>{
	return{type:SET_ONLY_FRIENDS,status}
}

export const changeFetching = (status)=>{
	return{type:SET_IS_FETCHING,status}
}

export const getUsers = (count,page,term)=> async (dispath)=>{
	const data = await UsersAPI.getUsers(count,page,term);
	dispath(setUsers(data.items));
	dispath(setTotalCount(data.totalCount));
	dispath(setPage(page));
	dispath(setPages(page));
	dispath(changeFetching(true));
}

export const getFriends = (term)=> async (dispath)=>{
	const data = await UsersAPI.getFriends(term);
	dispath(setUsers(data.items));
	dispath(changeFetching(true));
}

export const follow = (userId,count,page,term)=>(dispath)=>{
	UsersAPI.followUser(userId).then(data=>{
		if(data.resultCode === 0){
			dispath(getUsers(count,page,term))
		}
	});
}

export const unfollow = (userId,count,page,term)=>(dispath)=>{
	UsersAPI.unfollowUser(userId).then(data=>{
		if(data.resultCode === 0){
			dispath(getUsers(count,page,term))
		}
	});
}


export default friendsReducer;
