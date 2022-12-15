import React, { useState, useRef, useEffect } from 'react'
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { createMCP } from "../../actions/mcpsAction"

function AddMCP({ mcps, setMCPs, setIsAdding }) {


    const initialState = { address: '', capacity: 1};

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value || e.value });
    }

    const textInput = useRef(null);



    const handleAdd = e => {
        e.preventDefault();

        if (isSignup) {
            dispatch(createMCP(form, navigate)).catch((error) => {
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
                text: `MCP's data has been Added.`,
                showConfirmButton: false,
                timer: 1500
            });
            
            
        }

        setMCPs(mcps);
        setIsAdding(false);

    }


    return (
        
        <div className="small-container" >
            <form onSubmit={handleAdd}>
                <h1>Add MCP</h1>
                <label htmlFor="address">Address</label>
                <input class="overflow-auto"
                    id="address"
                    type="text"
                    ref={textInput}
                    name="address"
                    ///value={name}
                    onChange={handleChange}
                />
                <label htmlFor="capacity">Capacity</label>
                <input
                    id="capacity"
                    type="number"
                    name="capacity"
                    defaultValue={1}
                    //value={role}
                    onChange={handleChange}
                />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Add" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => {
                            setIsAdding(false)
                            if ( mcps == null ){ window.location.reload() }
                        }}
                    />
                </div>
            </form>
        </div>
    );
}

export default AddMCP