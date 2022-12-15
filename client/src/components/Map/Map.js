import Swal from 'sweetalert2';

import HeaderMCP from './HeaderMCP';
import ListMCP from './ListMCP';
import AddMCP from './AddMCP';
import EditMCP from './EditMCP';
import { useDispatch, useSelector } from 'react-redux';
import { getMCPs , deleteMCP} from "../../actions/mcpsAction";
import React, { useEffect, useState } from 'react';
import "./Map.css"





function Dashboard() {

    const dispatch = useDispatch();

    const [selectedMCP, setSelectedMCP] = useState(null);
    let [isAdding, setIsAdding] = useState(false);
    let [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		dispatch(getMCPs());
	}, [dispatch]);
    
    let {mcps:mcps} = useSelector((state) => state.mcps);
	// console.log(mcps)    
    const [MCPs, setMCPs] = useState(mcps);
    
    useEffect(() => {
        setMCPs(mcps);
    });

   

    const handleEdit = (id) => {
        const [mcp] = MCPs.filter(mcp => mcp._id === id);
        setSelectedMCP(mcp);
        setIsEditing(true);
    }

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                const [mcp] = MCPs.filter(mcp => mcp._id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${mcp.name} 's data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                

                dispatch(deleteMCP(mcp._id));
                setMCPs(MCPs.filter(mcp => mcp._id !== id));
            }
        });
    }


    return (
        <div class="map_bg">
        <div className='container'>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <div class="mapspace"></div>
                    <HeaderMCP
                        setIsAdding={setIsAdding}
                    />
                    <ListMCP
                        MCPs={MCPs}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <AddMCP
                    MCPs={MCPs}
                    setMCPs={setMCPs}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <EditMCP
                    MCPs={MCPs}
                    selectedMCP={selectedMCP}
                    setMCPs={setMCPs}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
        </div>
    )
}

export default Dashboard;