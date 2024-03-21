import React, { useState } from 'react';
import { KeyFill, PersonCircle, PersonFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';


function LoginPage() {
  const [userName, setUserName] = useState('')
  const [passWord, setPassword] = useState('')
  const [routeTo, setRouteTo] = useState()

  const handleSubmit = async (event) => {
    console.log("Form submitted"); // Check if form submission is working

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userName,
          password: passWord,
          // expiresInMins: 60, // optional
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        if(userName === 'jissetts'){
          return (setRouteTo('/admin'));// Handle successful login response
        }
        else{
          setRouteTo(`/employee/${userName}`); 
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className='LoginPage'>
        <div className='Form'>
            <div className='icon'><PersonCircle size={70} color='#0080ff'/></div>
            <form>
              <div>
                <PersonFill size={30} color='#0080ff'/>
                <input 
                  type='text' 
                  placeholder='Username' 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <KeyFill size={30} color='#0080ff'/>
                <input 
                  type='password' 
                  placeholder='Password' 
                  value={passWord} 
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
                <Link to={routeTo} type='submit' onClick={handleSubmit}>submit</Link>
            </form>
        </div>
    </div>
  )
}

export default LoginPage