import {LOGIN,SIGNUP, LOGOUT } from '../constants/actionTypes';

export default  (state = { auth: null }, action) => {
	switch (action.type) {
		case LOGIN:
			localStorage.setItem('profile', JSON.stringify({...action?.payload.user}));
			return {...state, auth: action.payload.user};
		case SIGNUP:
			return {...state};
		case LOGOUT:
			localStorage.clear();
			return { ...state, auth: null};
		default:
			return state;
	}
};
