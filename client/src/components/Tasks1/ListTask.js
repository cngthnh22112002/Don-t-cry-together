import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmps} from "../../actions/empsAction";


function ListTask({ Tasks, handleEdit, handleDelete , Emps}) {
    const {role} = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch();
    const shift = { 1: '7h-9h' , 2: '10h-12h' , 3:'13h-15h' , 4:'16h-18h' }
    useEffect(() => {
        dispatch(getEmps());
	}, [dispatch]);
    let {emps} = useSelector((state) => state.emps);  
    const getName = (index , type) => {
        try {
            if (type == 'name'){
                return String(emps.filter((e) => e._id === Tasks[index].employee)[0].name)
            }
            else if (type == 'role'){
                return String(emps.filter((e) => e._id === Tasks[index].employee)[0].role )
            }
        } catch (error) {
            
        }
    }
    
    return (
        <div class ="mapform">
        <div className='contain-table' >
            <table className='striped-table' >
                <thead>
                    <tr>
                        <th>STT</th>
						<th>Nhân viên</th>
                        <th>Vai trò</th>
						<th>Ngày giao</th>
                        <th>Ca làm việc</th>
						<th>Đoạn đường</th>
						<th>Khối lượng</th>
						<th>Trạng Thái</th>
                        <th colSpan={2} className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Tasks.length > 0 ? (
                        Tasks.map((task, i) => (
                            <tr key={task._id}>
                                <td>{i + 1}</td>
                                <td>{ getName(i , 'name') }</td>
                                <td>{ getName(i , 'role')}</td>
                                <td>{task.date}</td>
                                <td>{ shift[task.shift] }</td>
                                <td>{task.workingRange.length}</td>
                                <td>{task.workLoad}</td>
                                <td>{task.state}</td>
                                <td className="text-right">
                                    <button
                                        onClick={() => handleEdit(task._id)}
                                        className="button muted-button"
                                    >
                                        Edit
                                    </button>
                                </td>
                                { role === 'admin' && 
                                    <td className="text-left">
                                        <button
                                            onClick={() => handleDelete(task._id)}
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
                            <td colSpan={7}>No Tasks</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default ListTask