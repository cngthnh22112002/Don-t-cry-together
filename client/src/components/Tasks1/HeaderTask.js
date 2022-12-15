import React from 'react'

function Header({ setIsAdding }) {
    const {role } = JSON.parse(localStorage.getItem('profile'))
    return (
        <header>
            <h1 align="center">{ (role == 'admin' || role == 'backofficer' ) ?'Quản lý' : 'My'} Tasks</h1>
            {(role == 'admin' || role == 'backofficer' ) && <div style={{ marginTop: '20px', marginBottom: '18px' }}>
                <button onClick={() => setIsAdding(true)} className='round-button'>Add Task</button>
            </div>}
            
        </header>
    )
}

export default Header