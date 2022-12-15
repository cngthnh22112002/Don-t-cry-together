import React, { useState, useRef, useEffect } from 'react'
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { register } from "../../actions/authAction"

function Add({ employees, setEmployees, setIsAdding }) {


    const initialState = { name: '', username: '', password: '', role: '' , phone: ''};

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);
    const [err, setErr] = useState(''); 

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value || e.value });
    }

    const textInput = useRef(null);



    const handleAdd = e => {
        e.preventDefault();
        if (!form.name || !form.role || !form.username|| !form.password || !form.phone) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        if (isSignup) {
            dispatch(register(form, navigate)).catch((error) => {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: `${error.response.data.msg}`,
                    showConfirmButton: true
                });
            });
            Swal.fire({
                icon: 'success',
                title: 'Added!',
                text: `${form.name} ${form.role}'s data has been Added.`,
                showConfirmButton: false,
                timer: 1500
            });
            
            
        }

        setEmployees(employees);
        setIsAdding(false);

    }


    return (
        
        <div className="small-container" >
            <form onSubmit={handleAdd}>
                <h1>Add Employee</h1>
                <label htmlFor="name">Name</label>
                <input class="overflow-auto"
                    id="name"
                    type="text"
                    ref={textInput}
                    name="name"
                    ///value={name}
                    onChange={handleChange}
                />
                <label htmlFor="phone">Phone Number</label>
                <input
                    id="phone"
                    type="text"
                    name="phone"
                    //value={role}
                    onChange={handleChange}
                />
                <label htmlFor="role">Role</label>
                <input
                    id="role"
                    type="text"
                    name="role"
                    placeholder='admin / backofficer / collector / janitor'
                    //value={role}
                    onChange={handleChange}
                />
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    //value={username}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="text"
                    name="password"
                    //value={password}
                    onChange={handleChange}
                />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Add" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsAdding(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Add