import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import { useDispatch, useSelector } from 'react-redux';
import { getEmps, deleteEmp } from "../../actions/empsAction";
import React, { useEffect, useState } from 'react';
import "./Profile.css"





function Dashboard() {

    const dispatch = useDispatch();

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    let [isAdding, setIsAdding] = useState(false);
    let [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		dispatch(getEmps());
	}, [dispatch]);
    
    let {emps} = useSelector((state) => state.emps);

    
    const [employees, setEmployees] = useState(emps);
    
    useEffect(() => {
        setEmployees(emps);
    });

   

    const handleEdit = (id) => {
        const [employee] = employees.filter(employee => employee._id === id);
        setSelectedEmployee(employee);
        setIsEditing(true);
    }

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                const [employee] = employees.filter(employee => employee._id === id);
                dispatch(deleteEmp(employee._id)).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: `${error.response.data.msg}`,
                        showConfirmButton: true
                    });
                });
                
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${employee.name} 's data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                

                
        
                setEmployees(employees.filter(employee => employee._id !== id));
            }
        });
    }


    return (
        <div class="prf_bg">
        <div className='container'>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header
                        setIsAdding={setIsAdding}
                    />
                    <List
                        employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    employees={employees}
                    setEmployees={setEmployees}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
        </div>
    )
}

export default Dashboard;