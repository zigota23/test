import style from './Friends.module.css';
import Friend from './Friend/Friend.js';
import Preloader from './../../../hoc/Preloader/Preloader.js';


const Friends = (props)=>{
	const users = props.users.map((item,index)=>{
		return<Friend name={props.users[index].name} followed={props.users[index].followed}
		 userId={props.users[index].id} followUnfollow={props.followUnfollow} photo={props.users[index].photos.small}/>
	})

	if(!props.isFetching)return <Preloader/>

	return(
		<div className={style.frinds}>
			<div className={style.friends_list}>
			{!props.onlyFriends&&<div className={style.pages}>{props.pages.map((item,index)=>{return(item === '...'?<span>{item} </span>:
						<span onClick={()=>{props.onPageChanged(item)}}>{item==props.page?<strong>{item}</strong>:item} </span>)})}</div>}
			{users}
			</div>
			<div className={style.friends_menu}>
				<div className={style.search_friend}><input placeholder="search" value={props.term} onChange={props.onChangeSearch}/></div>	
				<button onClick={props.OnClickSearch}>Search</button>
				<div className={style.check_box_friends}><input type='checkbox' onClick={props.changeOnlyFriends}/>Only friends</div>
			</div>
		</div>
	)
}

export default Friends;