import React, {useState} from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employee from './component/Employee/Employee';
import LoginPage from './component/LoginPage';
import AdminPage from './component/Admin/AdminPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
        <Route path='/' element={<LoginPage/>}/>
          <Route path='/employee/:data' element={<Employee/>}/>
          <Route path='/admin' element={<AdminPage />} />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App