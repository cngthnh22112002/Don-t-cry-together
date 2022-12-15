import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Multiselect from 'multiselect-react-dropdown';
import Swal from 'sweetalert2';
import { getEmps } from '../../../actions/empsAction';
import { getMCPs } from '../../../actions/mcpsAction';
import { createTask } from '../../../actions/tasksAction';
import "./TaskForm.css"

const TaskForm = () => {
	const initialState = {employee: ' ', role: ' ' , workingRange: [], shift: ' ', date: ' ', workLoad: ' '};
    const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getEmps());
		dispatch(getMCPs())
	}, [dispatch]);
    const [form, setForm] = useState(initialState);

    

	let {emps} = useSelector(state => state.emps)
	let myEmps = emps
	const {mcps} = useSelector(state => state.mcps)
	myEmps = emps.filter( (emp) =>{
		return emp.role != 'admin'
	} )

	const [empsForm, setempsForm] = useState(myEmps);
	useEffect( () => {
		setempsForm(myEmps)
	} , [])
	
	const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value || e.value });

		if ( e.target.name === 'role' ){
			let index = e.nativeEvent.target.selectedIndex;
			const selectedRole = e.nativeEvent.target[index].label

			setempsForm( () => {
				if ( selectedRole == ' ' ) { return myEmps }
				return emps.filter( (emp) =>{
					return emp.role == selectedRole
				} )
			}  )
		}
    }

	const handleSubmit = (e) => {
        e.preventDefault();

		const toHuman = (e) => emps[e]
		form.employee = (typeof(form.employee) == "string") ? (toHuman(form.employee)) : form.employee ;
        dispatch(createTask(form)).catch((error) => {
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

	return (
	<>
	<div class="aligntf">
		<div class="titletask" align="center">
			<h1>TaskForm</h1>
		</div>
		<form onSubmit={handleSubmit}>
			<div class="form-group">
				<label htmlFor="emp">Employee</label>
				<select class="form-control" id="emp" name = "employee" style={{width:"34vw"}} onChange={handleChange}>
					<option label=" "></option>
					{empsForm.map((emp, index) => {
						let tmp = <option value={index} key={emp._id}>{emp.name} {emp._id}</option>
						
						return tmp
					})}
				</select>
			</div>
			<div class="form-group">
				<label htmlFor="role">Role</label>
				<select class="form-control" id="role" name = "role" style={{width:"34vw"}} onChange={handleChange}>
					<option label=" "></option>
					<option label="janitor"></option>
					<option label="collector"></option>
					<option label="backofficer"></option>
				</select>
			</div>
			<div class="form-group" style={{width:"34vw"}} id="example-multiple-selected">
				<label htmlFor="mcp">Working Route</label>
				<Multiselect
					id = 'mcp'
					options={mcps} // Options to display in the dropdown
					selectedValues={''} // Preselected value to persist in dropdown
					onSelect={(e) => setForm({...form, workingRange: e})} // Function will trigger on select event
					onRemove={(e) => setForm({...form, workingRange: e})} // Function will trigger on remove event
					displayValue="address" // Property name to display in the dropdown options
					showCheckbox = "true"
				/>
			</div>
			<div class="form-group" style={{width:"34vw"}}>
				<label htmlFor="shift">Shift</label>
				<select class="form-control" id="shift" name = "shift" onChange={handleChange} >
					<option label=" "></option>
					<option value="1">7h-9h</option>
					<option value="2">10h-12h</option>
					<option value="3">13h-15h</option>
					<option value="4">16h-18h</option>
				</select>
			</div>
			<div class="form-group" style={{width:"34vw"}}>
				<label htmlFor="date">Date</label>
				<input type="date" class="form-control" id="date" name ="date" onChange={handleChange}/>
			</div>
			<div class="form-group" style={{width:"34vw"}}>
                <label htmlFor="work">Work Load</label>
                <input type="number" class="form-control" id="work" name="workLoad" onChange={handleChange}/>
            </div>
			<br/>
			<div class="btnform">
				<button type="submit" class="btn btn-primary me-3">Submit</button>
				<button type="reset" class="btn btn-danger">Reset</button>
			</div>
		</form>
		</div>
	</>)
}

export default TaskForm