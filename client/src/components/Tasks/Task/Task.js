import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Task({idx, task}) {

    const {emps} = useSelector((state) => state.emps);
    // console.log(emps)
    const thatEmp = emps.filter((e) => e._id === task.employee)[0]
    // console.log(thatEmp)
	return (
		<tr>
            <td>{idx}</td>
            <td>
                { emps.filter((e) => e._id === task.employee)[idx].name }
            </td>
            <td>
            { emps.filter((e) => e._id === task.employee)[idx].role }
            </td>
            <td>
                {task.date}
            </td>
            <td>
                {task.workingRange.length}
            </td>
            <td>
                {task.workLoad}
            </td>
            <td>
                {task.state}
            </td>
        </tr>
	)
}

export default Task