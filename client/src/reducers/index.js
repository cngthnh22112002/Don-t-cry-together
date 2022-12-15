import { combineReducers } from 'redux';

import emps from './empsReducer.js';
import auth from './authReducer.js'
import mcps from './mcpReducer.js';
import tasks from './tasksReducer.js';

export const reducers = combineReducers({ emps, auth, mcps, tasks });