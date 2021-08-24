import React from 'react';
import style from './Header.module.css';
import photo from './../../img/user.png';
import {NavLink} from 'react-router-dom';
import logo from './../../img/logo.png';

const isAuthTrue = (props)=>{
	return(
	<div className={style.me_profile}>
		<NavLink to={'/profile/'+ props.userId}>
			<div className={style.me_img}><img src={props.photo?props.photo:photo}/></div>
		</NavLink>
		<div className={style.me_login}>{props.login}</div>
		<div className={style.buttonLogout}><button onClick={props.logout}>Logout</button></div>
	</div>)
}


const Header = (props)=>{
	return(
		<div className={style.header}>
			<div className={style.logo}><img src={logo}/></div>
			{props.isAuth?
				isAuthTrue(props)
				:
				<div className={style.me_profile}>
					<div className={style.login}><NavLink to="/login">Login</NavLink></div>
				</div>
			} 
		</div>
	)
}

export default Header;
