import React from 'react'
import { BoxArrowRight, PersonCircle } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <div className='Header'>
        <div className='User'>
            <div className='logo'>
                <PersonCircle size={60} color='#0259b1' />
            </div>
            <div className="info">
            <h1>{props.name}</h1>
            <p>Employee</p>
            </div>
        </div>
        <div className='logout-btn'>
        <Link to='/'><BoxArrowRight size={70} /></Link>
      </div>
    </div>
  )
}

export default Header