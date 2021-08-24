import React,{useEffect} from 'react';
import style from './Dialog.module.css';
import Preloader from './../../../hoc/Preloader/Preloader.js';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {getDialog,changeFetching} from './../../../redux/dialog-reducer.js'


const Dialog = (props)=>{

	useEffect(()=>{
		props.getDialog(props.match.params.userId,props.meId,props.dialog);
		return ()=>{props.changeFetching(false)}
	},[])

	let dialog = props.dialog.map(item=>{
		return(
			<div className={item.userId==props.meId?style.me_message:style.message}>
				<div className={style.img_user}><img src={item.userPhoto}/></div>
				<div className={style.text_message}>{item.message}</div>
			</div>
			)
	})

	if(!props.isFetching)return <Preloader/>

	return(
		<div className={style.dialog}>
			{dialog}
			<div className={style.newMessage}><textarea></textarea></div>
			<div className={style.sendMessage}><button>Send Message</button></div>
		</div>
		)
}


const mapStateToProps = (state)=>{
	return{
		dialog:state.dialogReducer.dialog,
		meId:state.authReducer.userId,
		isFetching:state.dialogReducer.isFetching,
	}
}


export default compose(
	withRouter,
	connect(mapStateToProps,{getDialog,changeFetching})
	)(Dialog);