import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmps, getEmpsBySearch } from "../../actions/empsAction";

import Employee from './Employee/Employee.js'
import "./Employees.css"

const Employees = () => {
    const initialState = {name: '', role: ''};
    const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getEmps());
	}, [dispatch]);
    
    const {emps} = useSelector((state) => state.emps);


    const [searchQuery, setSearchQuery] = useState(initialState)

    useEffect(() => {
        dispatch(getEmpsBySearch(searchQuery));   
    }, [searchQuery])

    const handleChange = (e) => {
        setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value});
        
    }
    const clear = () => {
        setSearchQuery(initialState);
    }
    
    return (
    <>
        <div class="emp_bg">
        <div class="tittleemp">
            <h1 align="center"><strong>Employees List</strong></h1>
        </div>
        <div class="search">
        <div class="input-group mb-3" style={{width:"50vw"}}>
        <div class="search">
        <p>
            <input type="text" class="form-control" style={{width:"46.7vw"}} name="name" value={searchQuery.search} onChange={handleChange}/>
        </p>
        <a>
            <div class="input-group-append">
                <span class="input-group-text"><i class="bi bi-x" role="button" onClick={clear}/></span>
            </div>
        </a>
        </div>
            
        </div>
        </div>
        {!emps.length ? <div class="spinner-border" role="status"/> :
        <div class="displayemp">
        <ul class="list-group" style={{width:"50vw"}}>
            {emps.map((emp) => <Employee emp={emp} key={emp._id}/>)}
        </ul>
        </div> }
        </div>     
    </>)
};

export default Employees;