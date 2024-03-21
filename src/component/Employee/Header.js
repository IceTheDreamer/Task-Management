import React from 'react'
import { BoxArrowRight, PersonCircle } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='Header'>
        <div className='User'>
            <div className='logo'>
                <PersonCircle size={60} color='#0259b1' />
            </div>
            <div className="info">
            <h1>Icy Joy C. Pe</h1>
            <p>Admin</p>
            </div>
        </div>
        <div className='logout-btn'>
        <Link to='/'>Logout <BoxArrowRight /></Link>
      </div>
    </div>
  )
}

export default Header