import React from 'react';
import style from './Content.module.css';
import {Route} from 'react-router-dom';
import Profile from './Profile/Profile.js';
import FriendsConteiner from './Friends/FriendsConteiner.js';
import MessagesContainer from './Messages/MessagesContainer.js';
import DialogContainer from './Dialog/DialogContainer.js';
import LoginContainer from './Login/LoginContainer.js';

let Content = ()=>{
	return(
		<div>
			<Route path='/profile/:userId' component={()=><Profile className={style.profile}/>}/>
			<Route path='/friends' component={()=><FriendsConteiner className={style.friends}/>}/>
			<Route path='/messages' component={()=><MessagesContainer className={style.messages}/>}/>
			<Route path='/dialog/:userId' component={()=><DialogContainer className={style.dialog}/>}/>

			<Route path='/login' component={()=><LoginContainer className={style.login}/>}/>
		</div>	
		);
}

export default Content;
