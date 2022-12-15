import { DELETE, FETCH_BY_SEARCH, FETCH_ALL, UPUSER} from '../constants/actionTypes';

export default (state = {emps: []}, action) => {
	switch (action.type) {
		case FETCH_ALL:
			return {...state, emps: action.payload.users};
		case DELETE:
			return {...state, emps: state.emps.filter((emp) => emp._id !== action.payload)};
		case FETCH_BY_SEARCH:
			return {...state, emps: action.payload.users};
		case UPUSER:
			return {...state, emps: action.payload.users};
		default:
			return state;
	}
};