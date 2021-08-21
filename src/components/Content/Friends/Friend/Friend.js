import style from './Friend.module.css';
import photo from './../../../../img/user.png';
import {NavLink} from 'react-router-dom';


const Friend = (props)=>{
	return(
		<div className={style.friend}>
			<NavLink to={'/profile/'+props.userId}><div className={style.img_friend}><img src={props.photo?props.photo:photo}/></div></NavLink>
			<div className={style.info_friend}>
				<div className={style.name_friend}>{props.name}</div>
				{props.followed? <div className={style.unfollow}><button onClick={()=>{props.followUnfollow(props.userId,props.followed)}}>unfollow</button></div>:
								 <div className={style.follow}><button onClick={()=>{props.followUnfollow(props.userId,props.followed)}}>follow</button></div>}
			</div>
		</div>
	)
}
 
export default Friend;