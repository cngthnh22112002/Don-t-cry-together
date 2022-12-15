import { AUTH, LOGIN, LOGOUT, SIGNUP } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const login = (formData, router) => async (dispatch) => {
  	try {
    	const { data } = await api.login(formData);
    	dispatch({ type: LOGIN, payload: data });
    	router('/');
  	} catch (error) {
		console.log(error.message);
    	return Promise.reject(error)
  	}
};

export const register = (formData, router) => async (dispatch) => {
  	try {
    	await api.register(formData);	
    	router('/profile');
		window.location.reload()
  	} catch (error) {
		console.log(error.message);
    	return Promise.reject(error)
  	}
};


export const logout = (router) => async (dispatch) => {
	try {
	  	const {data} = await api.logout();
	  	dispatch({ type: LOGOUT, payload: data });
		localStorage.clear();
	  	router('/');
		window.location.reload()
	} catch (error) {
		console.log(error.message);
	  return Promise.reject(error)
	}
};

export const getCurrentUser = (router) => async (dispatch) => {
	try {
	  	const {data} = await api.getCurrentUser();
	  	dispatch({ type: AUTH, payload: data });
	  	router('/');
	} catch (error) {
		console.log(error.message);
	  return Promise.reject(error)
	}
};