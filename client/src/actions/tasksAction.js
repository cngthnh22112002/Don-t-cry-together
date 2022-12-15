import { GET_TASK, CREATE_TASK , DELETE , UPTASK , GET_MY_TASK } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getTasks = () => async (dispatch) => {
	try {
		const { data } = await api.fetchTasks();
		dispatch({ type: GET_TASK, payload: data });
		
	} catch (error) {
		console.log(error);
        return Promise.reject(error)
  	}
};

export const createTask = (task) => async (dispatch) => {
    try {
        const {data} = await api.createTask(task);
		router('/tasks');
		window.location.reload()
        dispatch({ type: CREATE_TASK, payload: data });
    } catch (error) {
        console.log(error);
        return Promise.reject(error)
    }
};

export const updateTask = (id , formData) => async (dispatch) => {
	try {
		const { data : data } = await api.updateTask(id , formData);
		dispatch({ type: UPTASK, payload: data });
		
	} catch (error) {
		console.log(error.message);
		return Promise.reject(error)
	}
};

export const deleteTask = (id) => async (dispatch) => {
	try {
		await api.deleteTask(id);
		dispatch({ type: DELETE, payload: id });
		
	} catch (error) {
		console.log(error.message);
		return Promise.reject(error)
	}
};


export const getMyTasks = () => async (dispatch) => {
	try {
		const { data } = await api.getMyTasks();
		dispatch({ type: GET_MY_TASK, payload: data });
		
	} catch (error) {
		console.log(error);
        return Promise.reject(error)
  	}
};
