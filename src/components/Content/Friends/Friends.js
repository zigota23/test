import style from './Friends.module.css';
import Friend from './Friend/Friend.js';


const Friends = (props)=>{
	const users = props.users.map((item,index)=>{
		return<Friend name={props.users[index].name} followed={props.users[index].followed}
		 userId={props.users[index].id} followUnfollow={props.followUnfollow} photo={props.users[index].photos.small}/>
	})

	return(
		<div className={style.frinds}>
			<div className={style.pages}>{props.pages.map((item,index)=>{return(item === '...'?<span>{item} </span>:
						<span onClick={()=>{props.onPageChanged(item)}}>{item==props.page?<strong>{item}</strong>:item} </span>)})}</div>
			{users}
		</div>
	)
}

export default Friends;