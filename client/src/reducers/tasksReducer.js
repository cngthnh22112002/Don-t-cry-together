import { GET_TASK, CREATE_TASK , GET_MY_TASK} from '../constants/actionTypes';

export default (state = {tasks: []}, action) => {
	switch (action.type) {
		case GET_TASK:
			return {...state, tasks: action.payload.tasks};
		case GET_MY_TASK:
			return {...state, tasks: action.payload.myTasks};
		case CREATE_TASK:
			return {...state, tasks: [...state.tasks, action.payload.task]}
		default:
			return state;
	}
};