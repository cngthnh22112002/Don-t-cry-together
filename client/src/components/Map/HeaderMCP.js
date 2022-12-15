import React from 'react'

function Header({ setIsAdding }) {
    const {role } = JSON.parse(localStorage.getItem('profile'))
    return (
        <header>
            <h1 align="center">Quản lý MCP</h1>
            {(role == 'admin' || role == 'backofficer' ) && <div style={{ marginTop: '20px', marginBottom: '18px' }}>
                <button onClick={() => setIsAdding(true)} className='round-button'>Add MCP</button>
            </div>}
            
        </header>
    )
}

export default Header