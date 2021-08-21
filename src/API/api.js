import * as axios from 'axios';		



let instance = axios.create({
	baseURL:'https://social-network.samuraijs.com/api/1.0/',
	withCredentials:true,
	headers:{"API-KEY":'ad613ef4-28a0-4198-b947-fec8259efa07'}
});


export const UsersAPI ={
	getUsers:(count,page)=>instance.get('users?count='+count+'&page='+page).then(response =>response.data),

	unfollowUser:(userId)=>instance.delete('follow/'+userId).then(response=>response.data),

	followUser:(userId)=>instance.post('follow/'+userId).then(response=>response.data),

} 


export const ProfileAPI = {

	getProfile:(userId)=>instance.get('profile/'+userId).then(response=>response.data),
	getStatus:(userId)=>instance.get('profile/status/'+userId).then(response=>response.data),
	setStatus:(status)=>{instance.put('profile/status',{status})},

}


export const AuthAPI = {

	authMe:()=>instance.get('auth/me').then(response=>response.data),
	login:(email,password,rememberMe)=>instance.post('auth/login',{email,password,rememberMe}).then(response=>(response.data)),
	logout:()=>instance.delete('auth/login'),

}
