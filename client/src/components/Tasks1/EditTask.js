import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateTask  } from "../../actions/tasksAction"
import {  getMCPs } from "../../actions/mcpsAction"

function Edit({ tasks, selectedTask, setEmployees, setIsEditing }) {
    let tmpState = {}
    if ( selectedTask.checkIn != null ){
        tmpState.checkIn = true
    }
    if ( selectedTask.checkOut != null ){
        tmpState.checkOut = true
    }
    const initialState = { 
          workLoad:selectedTask.workLoad,
          checkIn:tmpState.checkIn,
          checkOut:tmpState.checkOut   
    };
    const workingRange = selectedTask.workingRange
    // console.log(selectedTask)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
		dispatch(getMCPs());
	}, [dispatch]);
    
    let {mcps:mcps} = useSelector((state) => state.mcps);
    

    const [form, setForm] = useState(initialState);

    const getMCPName = (id) => {
        try {
            return String(mcps.filter((e) => e._id === id)[0].address)   
        } catch (error) {
            
        }
    }
    
    const handleChange = (e) => {
      
        if ( e.target.name == 'checkIn' || e.target.name == 'checkOut'){
            return setForm({ ...form, [e.target.name]: e.target.checked});
        }
        setForm({ ...form, [e.target.name]: e.target.value || e.target.checked});
        
    }
    const {workLoad ,checkIn , checkOut} = form
    const {role: currentUserRole } = JSON.parse(localStorage.getItem('profile'))
    



    const handleUpdate = e => {
        e.preventDefault();
        
        let updatedForm = Object.fromEntries(Object.entries(form).filter(([_, v]) => (v != '' && v!= null)));
        if ( updatedForm.workLoad == selectedTask.workLoad && (currentUserRole == 'janitor' || currentUserRole== 'collector') ){
            updatedForm = {checkIn: updatedForm.checkIn , checkOut:updatedForm.checkOut} 
        }
        dispatch(updateTask(selectedTask._id, updatedForm)).catch((error) => {
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
                <h1>Update Task</h1>
                <label htmlFor="workRange">Work Route</label>
                {workingRange.length > 0 ? (
                    workingRange.map((mcp, i) => (
                            <tr key={mcp._id}>
                                <td>{`${i + 1}.`}</td>
                                <td>{getMCPName(mcp)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>No Route</td>
                        </tr>
                    )}
                <label htmlFor="workLoad">Work Load</label>
                <input
                    id="workLoad"
                    type="text"
                    name="workLoad"
                    value={workLoad}
                    onChange={handleChange}
                />
               
                <div>
                <input
                    id="checkIn"
                    type="checkbox"
                    name="checkIn"
                    checked={checkIn}
                    onChange={handleChange}
                />
                <label htmlFor="checkIn">Check In</label>
                </div>

                <div>
                <input
                    id="checkOut"
                    type="checkbox"
                    name="checkOut"
                    checked={checkOut}
                    onChange={handleChange}
                />
                <label htmlFor="checkout">Check Out</label>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => {
                            setIsEditing(false)
                           
                        }}
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit