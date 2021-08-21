import {combineReducers,createStore,applyMiddleware} from 'redux';
import profileReducer from './profile-reducer.js';
import friendsReducer from './friends-reducer.js';
import authReducer from './auth-reducer.js';
import messagesReducer from './messages-reducer.js';
import dialogReducer from './dialog-reducer.js';
import appReducer from './app-reducer.js';
import thunkMiddleware from 'redux-thunk';
import {reducer as form} from 'redux-form';

const reducers = combineReducers({
	profileReducer,
	friendsReducer,
	authReducer,
	messagesReducer,
	dialogReducer,
	form,
	appReducer,
});

const store = createStore(reducers,applyMiddleware(thunkMiddleware));

window.store = store;


export default store;