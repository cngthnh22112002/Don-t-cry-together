import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { getEmps} from "../../actions/empsAction";
// import {getCurrentUser} from '../../actions/authAction'
import "./Profile.css"



function List({ employees, handleEdit, handleDelete }) {
    const {role} = JSON.parse(localStorage.getItem('profile'))
    return (
        <div class="alignprf">
        <div className='contain-table'>
            <table className='striped-table'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>SĐT</th>
                        <th>ID</th>
                        {role === 'admin' && <th>Password</th>}
                        <th colSpan={2} className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((emp, i) => (
                            <tr key={emp._id}>
                                <td>{i + 1}</td>
                                <td>{emp.name}</td>
                                <td>{emp.role}</td>
                                <td>{emp.phone}</td>
                                <td>{emp._id}</td>
                                {role === 'admin' && <td>************</td>}
                                <td className="text-right">
                                    <button
                                        onClick={() => handleEdit(emp._id)}
                                        className="button muted-button"
                                    >
                                        Edit
                                    </button>
                                </td>
                                { role === 'admin' && 
                                    <td className="text-left">
                                        <button
                                            onClick={() => handleDelete(emp._id)}
                                            className="button muted-button"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                }
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>No Employees</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default List