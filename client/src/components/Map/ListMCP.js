import React, { useEffect, useState } from 'react';




function ListMCP({ MCPs, handleEdit, handleDelete }) {
    const {role} = JSON.parse(localStorage.getItem('profile'))
    // console.log(MCPs)
    return (
        <div class ="mapform">
        <div className='contain-table' >
            <table className='striped-table' >
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Address</th>
                        <th>Capacity</th>
                        <th>Current Load</th>
                        <th>Status</th>
                        <th colSpan={2} className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {MCPs.length > 0 ? (
                        MCPs.map((mcp, i) => (
                            <tr key={mcp._id}>
                                <td>{i + 1}</td>
                                <td>{mcp.address}</td>
                                <td>{mcp.capacity}</td>
                                <td>{mcp.currentLoad}</td>
                                <td>{mcp.status}</td>
                                <td className="text-right">
                                    <button
                                        onClick={() => handleEdit(mcp._id)}
                                        className="button muted-button"
                                    >
                                        Edit
                                    </button>
                                </td>
                                { role === 'admin' && 
                                    <td className="text-left">
                                        <button
                                            onClick={() => handleDelete(mcp._id)}
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
                            <td colSpan={7}>No MCPs</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default ListMCP