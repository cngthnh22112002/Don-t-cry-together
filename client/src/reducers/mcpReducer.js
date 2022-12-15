import { GET_ALL, CREATE_MCP } from '../constants/actionTypes';

export default (state = {mcps: []}, action) => {
	switch (action.type) {
		case GET_ALL:
			return {...state, mcps: action.payload.mcps};
		case CREATE_MCP:
			return {...state, mcps: [...state.mcps, action.payload.mcp]}
		default:
			return state;
	}
};