import {UsersAPI} from './../API/api.js';

const SET_USERS = 'zigota/friends/SET_USERS';
const SET_TOTAL_COUNT ='zigota/friends/SET_TOTAL_COUNT';
const SET_PAGE = 'zigota/friends/SET_PAGE';
const SET_PAGES = 'zigota/friends/SET_PAGES';

const initialState = {
	users:[],
	pages:[],
	totalCount:null,
	count:20,
	page:1,
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

export const getUsers = (count,page)=> async (dispath)=>{
	const data = await UsersAPI.getUsers(count,page);
	dispath(setUsers(data.items));
	dispath(setTotalCount(data.totalCount));
	dispath(setPage(page));
	dispath(setPages(page));
}

export const follow = (userId,count,page)=>(dispath)=>{
	UsersAPI.followUser(userId).then(data=>{
		if(data.resultCode === 0){
			dispath(getUsers(count,page))
		}
	});
}

export const unfollow = (userId,count,page)=>(dispath)=>{
	UsersAPI.unfollowUser(userId).then(data=>{
		if(data.resultCode === 0){
			dispath(getUsers(count,page))
		}
	});
}


export default friendsReducer;
