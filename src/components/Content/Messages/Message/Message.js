import React from 'react';
import style from './Message.module.css';


const Message = (props)=>{
	return (
		<div className={style.message}>
			<div className={style.photo_user}><div><img src={props.userPhoto}/></div></div>
			<div className={style.info_message}>
				<div className={style.user_name}><h4>{props.userName}</h4></div>
				<div className={style.last_message}>{props.lastMessage}</div>
			</div>
		
		</div>

	)
}

export default Message;