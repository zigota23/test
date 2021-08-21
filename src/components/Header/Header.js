import React from 'react';
import style from './Header.module.css';
import photo from './../../img/user.png';
import {NavLink} from 'react-router-dom';

let Header = (props)=>{
	return(
		<div className={style.header}>
			<div className={style.logo}>dfdfd</div>
			{props.isAuth?
				<div className={style.me_profile}>
				<NavLink to={'/profile/'+ props.userId}>
				<div className={style.me_img}><img src={props.photo?props.photo:photo}/></div>
				</NavLink>
				<div className={style.me_login}>{props.login}</div>
				<div className={style.buttonLogout}><button onClick={props.logout}>Logout</button></div>
				</div>
				:
				<div className={style.me_profile}>
				<div>Login</div>
				</div>
			} 
		</div>
	)
}

export default Header;
