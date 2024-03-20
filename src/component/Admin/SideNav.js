import React from 'react'
import User from './User'
import AddNewEmployee from './AddNewEmployee'
import TasksLists from './TasksLists'
import { BoxArrowRight } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom';

function SideNav(props) {
  return (
    <div className='body'>
      <User />
      <AddNewEmployee />
      <TasksLists data={props.data} />
      <div className='logout-btn'>
        <Link to='/'>Logout <BoxArrowRight /></Link>
      </div>
    </div>
  )
}

export default SideNav