import React from 'react';
import style from './Messages.module.css';
import Message from './Message/Message.js';
import {NavLink} from 'react-router-dom';


const Messages = (props)=>{

	let messages = props.messages.map((item)=>{
		return <NavLink to={'/dialog/'+item.userId}><Message {...item}/></NavLink>
	})

	return (
		<div className={style.messages}>
			{messages}
		</div>

	)
}

export default Messages;