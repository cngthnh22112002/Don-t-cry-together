import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';





import { login, register } from "../../actions/authAction"
import { AUTH } from "../../constants/actionTypes"
import "./Auth.css"


const Auth = () => {
    const initialState = { name: '', username: '', password: '', role: ''};

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value || e.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(register(form, navigate)).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: `${error.response.data.msg}`,
                    showConfirmButton: true
                });
            });
        } else {
            dispatch(login(form, navigate)).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: `${error.response.data.msg}`,
                    showConfirmButton: true
                });
            });
        }
    }

    return (
    <div className="auth-form-container">
    <form className="login-form" style={{width:"50vw"}} onSubmit={handleSubmit}>
        <h1 class="sitext">{ isSignup ? 'Sign Up': 'Sign In' }</h1>
        {   isSignup && (
            <div class="form-group">
            <label htmlFor="#fname">Name</label>
            <input type="text" id="fname" class="form-control" name="name" onChange={handleChange}/>
            </div>
        )
        }
        <div class="form-group"  align="left">
            <label htmlFor="#username">Username</label>
            <input type="text" id="usernme" class="form-control" name="username" onChange={handleChange}/>
        </div>
        <div class="form-group"  align="left">
            <label htmlFor="#pass">Password</label>
            <input type="password" id="class" class="form-control" name="password" onChange={handleChange}/>
        </div>
        { isSignup && (<div class="form-group">
            <label htmlFor="role">Role</label>
            <select class="form-control" id="role" name = "role" onChange={handleChange}>
                <option value="janitor">Janitor</option>
                <option value="collector">Collector</option>
                <option value="backofficer">Back Officer</option>
                <option value="admin">Admin</option>
            </select>
        </div>)
        }
        <hr/>
        <button type="submit" class="link-btn">{'Sign In'}</button>
    </form>
    </div>
    );
}

export default Auth;
