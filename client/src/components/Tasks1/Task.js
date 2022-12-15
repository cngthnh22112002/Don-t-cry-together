import Swal from 'sweetalert2';

import HeaderTask from './HeaderTask';
import ListTask from './ListTask';
import AddTask from './AddTask';
import EditTask from './EditTask';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks , getMyTasks , deleteTask} from "../../actions/tasksAction";
import { getEmps} from "../../actions/empsAction";
import React, { useEffect, useState } from 'react';
import "./Task.css"





function Dashboard() {

    const dispatch = useDispatch();
    const {role} = JSON.parse(localStorage.getItem('profile'))
    const [selectedTask, setSelectedTask] = useState(null);
    let [isAdding, setIsAdding] = useState(false);
    let [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
        if (role == 'janitor' ||role == 'collector'){
            dispatch(getMyTasks());
        }
        else{ dispatch(getTasks());}
        dispatch(getEmps());
	}, [dispatch]);
    
    let {tasks:tasks} = useSelector((state) => {return state.tasks;});
    
    
  
    
    let {emps} = useSelector((state) => state.emps);  
    const [Tasks, setTasks] = useState(tasks);
    
    useEffect(() => {
        setTasks(tasks);
    });

   

    const handleEdit = (id) => {
        const [task] = Tasks.filter(task => task._id === id);
        setSelectedTask(task);
        setIsEditing(true);
    }

    const handleDelete = (id) => {
        let tmp = 0
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                const [task] = Tasks.filter(task => task._id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${task.name} 's data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                

                dispatch(deleteTask(task._id)).catch((error) => {
                    tmp = 1
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: `${error.response.data.msg}`,
                        showConfirmButton: true
                    });
                });
    
                
                if (tmp == 0){
                    setTasks(Tasks.filter(task => task._id != id));
                    window.location.reload()
                }
            }
        });
       
    }


    return (
        <div class="map_bg">
        <div className='container'>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <div class="mapspace"></div>
                    <HeaderTask
                        setIsAdding={setIsAdding}
                    />
                    <ListTask
                        Tasks={Tasks}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        Emps={emps}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <AddTask
                    Tasks={Tasks}
                    setTasks={setTasks}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <EditTask
                    Tasks={Tasks}
                    selectedTask={selectedTask}
                    setTasks={setTasks}
                    setIsEditing={setIsEditing}
                    
                />
            )}
        </div>
        </div>
    )
}

export default Dashboard;