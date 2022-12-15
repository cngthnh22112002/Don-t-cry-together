import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateEmp  } from "../../actions/empsAction"
import {fetchEmps} from '../../api/index'

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {
    const vehiclesValue = {None:0 ,HDPE240L: 80, HDPE660L: 150, Suzki: 400, Jac: 1375 ,Hyundai:1300 ,Hino: 6000}
    const valueVehicles = { 0: 'None' , 80: 'HDPE240L' , 150: 'HDPE660L' , 400: 'Suzki' ,  1375: 'Jac' , 1300: 'Hyundai' , 6000: 'Hino' }
    const initialState = { 
        name: selectedEmployee.name,
        username: selectedEmployee.username, 
        id:selectedEmployee._id ,
        password: '', 
        role: selectedEmployee.role, 
        currentVehicle: valueVehicles[selectedEmployee.currentVehicle]};
  
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [form, setForm] = useState(initialState);

    
    const handleChange = (e) => {
        if ( e.target.name === 'currentVehicle' ){
			let index = e.nativeEvent.target.selectedIndex;
			const selectedVehicle = e.nativeEvent.target[index].value
            return setForm({ ...form, currentVehicle: selectedVehicle});
		}

        setForm({ ...form, [e.target.name]: e.target.value});
    }
    const {name , username , password , role , currentVehicle } = form
    const {role: currentUserRole } = JSON.parse(localStorage.getItem('profile'))
    



    const handleUpdate = e => {
        e.preventDefault();
        
        let updatedForm = Object.fromEntries(Object.entries(form).filter(([_, v]) => (v != '' && v!= null)));
        const { [updatedForm.currentVehicle] : tmpV } = vehiclesValue
        console.log(updatedForm.currentVehicle)
        console.log(tmpV)
        updatedForm = { ...updatedForm , currentVehicle: tmpV }
        dispatch(updateEmp(selectedEmployee._id, updatedForm)).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `${error.response.data.msg}`,
                showConfirmButton: true
            });
        });

        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${form.name} 's data has been updated.`,
            showConfirmButton: false,
            timer: 1500
        });
    
        
       
        
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Edit Employee</h1>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
                <label htmlFor="role">Role</label>
                <input
                    id="role"
                    type="text"
                    name="role"
                    value={role}
                    onChange={handleChange}
                />
                <label htmlFor="id">Role</label>
                <input
                    id="id"
                    type="text"
                    name="role"
                    value={role}
                    onChange={handleChange}
                />

                {currentUserRole === 'admin' && 
                    <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="passwaord"
                        type="text"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                    </div>
                }
                
            
                {/* <label htmlFor="currentVehicle">Phương tiện lái</label>
                <input
                    id="currentVehicle"
                    type="number"
                    name="currentVehicle"
                    value={currentVehicle}
                    onChange={handleChange}

                    
                /> */}
                { (selectedEmployee.role == 'janitor' || selectedEmployee.role == 'collector') &&
                <label htmlFor="currentVehicle">Phương tiện lái</label> 
                }
                {selectedEmployee.role == 'janitor' &&
                <select class="form-control" name="currentVehicle" value={currentVehicle} onChange={handleChange}>
                    <option value="None">None</option>   
                    <option value="HDPE240L">HDPE 240L</option>
                    <option value="HDPE660L">HDPE 660L</option>
                </select> 
                }

                {selectedEmployee.role == 'collector' &&
                <select class="form-control" name="currentVehicle" value={currentVehicle} onChange={handleChange}>
                    <option value="None">None</option>   
                    <option value="Suzuki">Suzki</option>
                    <option value="Jac">Jac</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Hino">Hino</option>
                </select>
                }

                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => {
                            setIsEditing(false)
                            if ( employees == null ){ window.location.reload() }
                        }}
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit