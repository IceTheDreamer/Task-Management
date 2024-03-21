import React from 'react'
import { PersonCircle } from 'react-bootstrap-icons';

function User() {
  return (
    <div className='User'>
        <div className="info">
          <h1>Macy Greenfelder</h1>
          <p>Admin</p>
        </div>
        <div className='logo'>
          <PersonCircle size={60} color='#0259b1' />
        </div>
    </div>
  )
}

export default User;