import React from 'react';
import style from './Dialog.module.css';


const Dialog = (props)=>{

	let dialog = props.dialog.map(item=>{
		return(
			<div className={item.userId==props.meId?style.me_message:style.message}>
				<div className={style.img_user}><img src={item.userPhoto}/></div>
				<div className={style.text_message}>{item.message}</div>
			</div>
			)
	})

	return(
		<div className={style.dialog}>
			{dialog}
			<div className={style.newMessage}><textarea></textarea></div>
			<div className={style.sendMessage}><button>Send Message</button></div>
		</div>
		)
}

export default Dialog;