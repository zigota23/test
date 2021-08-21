import React from 'react';
import style from './NavBar.module.css';
import {NavLink} from 'react-router-dom';

let NavBar = (props)=>{
	debugger
	return(
		<div className={style.nav_bar}>
			<div><NavLink to={'/profile/'+props.userId} activeClassName={style.activeLink}>Профиль</NavLink></div>
			<div><NavLink to='/friends'activeClassName={style.activeLink}>Друзья</NavLink></div>
			<div><NavLink to='/messages'activeClassName={style.activeLink}>Сообщения</NavLink></div>
			<div><NavLink to='/music'activeClassName={style.activeLink}>Музыка</NavLink></div>
			<div><NavLink to='/galery'activeClassName={style.activeLink}>Галерея</NavLink></div>
			<div><NavLink to='/news'activeClassName={style.activeLink}>Новости</NavLink></div>
		</div>
		);
}

export default NavBar;
