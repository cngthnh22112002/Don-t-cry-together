import { CREATE_MCP, GET_ALL , UPMCP , DELETE} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getMCPs = () => async (dispatch) => {
	try {
		const { data } = await api.fetchMCPs();
		dispatch({ type: GET_ALL, payload: data });

	} catch (error) {
		console.log(error);
  	}
};

export const updateMCP = (id , formData) => async (dispatch) => {
	try {
		const { data : data } = await api.updateMCP(id , formData);
		dispatch({ type: UPMCP, payload: data });
		
	} catch (error) {
		console.log(error.message);
		return Promise.reject(error)
	}
};

export const createMCP = (mcp) => async (dispatch) => {
    try {
        const {data} = await api.createMCP(mcp);
        dispatch({ type: CREATE_MCP, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteMCP = (id) => async (dispatch) => {
	try {
		await api.deleteMCP(id);
		dispatch({ type: DELETE, payload: id });
		
	} catch (error) {
		console.log(error.message);
		return Promise.reject(error)
	}
};