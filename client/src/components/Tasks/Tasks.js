import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTasks } from "../../actions/tasksAction";
import { getEmps } from "../../actions/empsAction";
import Task from './Task/Task.js';
import TaskForm from './Form/TaskForm.js'
import "./Task.css"

function Tasks() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTasks());
        dispatch(getEmps());
	}, [dispatch]);
    
	const {tasks} = useSelector(state => state.tasks);
	
	return (
		<div class="task_bg">
		<div class="aligntask">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="titletask" align="center">
						<h1>Tasks List</h1>
					</div>
					{!tasks.length ? <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
					<h1>No tasks here</h1></div> :
					<table class="table">
					<thead>
					  <tr>
						<th scope="col">STT</th>
						<th scope="col">Nhân viên</th>
                        <th scopr="col">Vai trò</th>
						<th scope="col">Ngày giao</th>
						<th scope="col">Đoạn đường</th>
						<th scope="col">Khối lượng</th>
						<th scope="col">Trạng Thái</th>
					  </tr>
					</thead>
					<tbody>
						{tasks.map((task, index) => <Task idx={index} task={task} key={task._id}/>)}
					</tbody>
					</table>}  
				</div>
				<div class="col">
					<TaskForm/>
				</div>
			</div>

		</div>
		</div>
	</div>
	)
}

export default Tasks