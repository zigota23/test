import {reduxForm,Field} from 'redux-form';
import style from './Login.module.css';
import {Input} from './../../Component/component.js';
import {required} from './../../../validator/validator.js';
import {Redirect} from 'react-router-dom'
 
const LoginForm = (props)=>{
	return(
		<form onSubmit={props.handleSubmit}>
				<div>
					<Field placeholder="email" type='text' name="email" validate={[required]} component={Input}/>
				</div>
				<div>
					<Field placeholder="password" type='password' name="password" validate={[required]} component={Input}/>
				</div>
				<div className={style.checkbox}>
					<Field type='checkbox' name="remember_me" component={Input}/><span>remember me</span>
				</div>
				<div>
					<button>login</button>
				</div>
				{props.error && 
					<div className={style.loginError}>
						{props.error}
					</div> }
			</form>
	)
}

const LoginReduxForm = reduxForm({form:'login'})(LoginForm);

const Login = (props)=>{

	const onSubmit = ({email,password,rememberMe=false})=>{
		props.login(email,password,rememberMe);
	}

	if(props.isAuth){return <Redirect to={'/profile/'+props.userId}/>}

	return(
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit}/>
		</div>
	)
}


export default Login;