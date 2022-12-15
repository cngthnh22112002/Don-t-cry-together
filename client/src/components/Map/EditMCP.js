import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateMCP  } from "../../actions/mcpsAction"


function Edit({ mcps, selectedMCP, setEmployees, setIsEditing }) {
    const initialState = { 
        address: selectedMCP.address,
        capacity: selectedMCP.capacity, 
        currentLoad: selectedMCP.currentLoad
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [form, setForm] = useState(initialState);

    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    }
    const {address , capacity , currentLoad} = form
    const {role: currentUserRole } = JSON.parse(localStorage.getItem('profile'))
    



    const handleUpdate = e => {
        e.preventDefault();
        
        let updatedForm = Object.fromEntries(Object.entries(form).filter(([_, v]) => (v != '' && v!= null)));
        updatedForm = {currentLoad: updatedForm.currentLoad}
        dispatch(updateMCP(selectedMCP._id, updatedForm)).catch((error) => {
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
            text: `${form.address} 's data has been updated.`,
            showConfirmButton: false,
            timer: 1000
        });
    
        
       
        
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Update MCP</h1>
                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    type="text"
                    name="address"
                    value={selectedMCP.address}
                    onChange={handleChange}
                />
                { (currentUserRole ==='admin' || currentUserRole === 'backofficer') &&
                    <div>
                    <label htmlFor="capacity">Capacity</label>
                    <input
                        id="capacity"
                        type="number"
                        name="capacity"
                        value={selectedMCP.capacity}
                        onChange={handleChange}
                    />
                    </div>
                }
                <label htmlFor="currentLoad">Current Load</label>
                <input
                    id="currentLoad"
                    type="number"
                    name="currentLoad"
                    value={currentLoad}
                    onChange={handleChange}
                />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => {
                            setIsEditing(false)
                            if ( mcps == null ){ window.location.reload() }
                        }}
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit