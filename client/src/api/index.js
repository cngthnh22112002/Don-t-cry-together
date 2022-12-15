import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/v1' });
const accessHeader = {withCredentials: true, headers: {'Access-Control-Allow-Origin': 'http://localhost'}}
export const fetchEmps = () => API.get('/user', accessHeader);
export const fetchEmpsBySearch = (searchQuery) => API.get(`/user?tag=${searchQuery.role}&name=${searchQuery.name}`,accessHeader);
export const deleteEmp = (userID) => API.delete(`/user/${userID}`, accessHeader);


export const register = (formData) => API.post('auth/register', formData, accessHeader);
export const login = (formData) => API.post('auth/login', formData, accessHeader);
export const logout = () => API.get('auth/logout', accessHeader);

export const getCurrentUser = () => API.get('auth/user/showMe', accessHeader);
export const updateUser = (id, formData) => API.patch(`/user/${id}`, formData, accessHeader)

export const fetchMCPs = () => API.get('/mcp', accessHeader);
export const createMCP = (formData) => API.post('/mcp', formData, accessHeader);
export const updateMCP = (id, formData) => API.patch(`/mcp/${id}`, formData, accessHeader)
export const deleteMCP = (id) => API.delete(`/mcp/${id}`, accessHeader);

export const fetchTasks = () =>  API.get('/tasks', accessHeader);
export const createTask = (formData) => API.post('/tasks', formData, accessHeader)
export const updateTask = (id, formData) => API.patch(`/tasks/${id}`, formData, accessHeader)
export const deleteTask = (id) => API.delete(`/tasks/${id}`, accessHeader);
export const getMyTasks = () =>  API.get('/tasks/myTasks', accessHeader);