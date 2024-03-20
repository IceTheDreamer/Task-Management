import React, { useState } from 'react';
import { KeyFill, PersonCircle, PersonFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import {getDocs, collection} from 'firebase/firestore/lite'

const usersCol = collection(db, 'users');
const usersSnapshot = await getDocs(usersCol);
const usersLists = usersSnapshot.docs.map(doc => doc.data().UserName);

function LoginPage() {
  const [userName, setUserName] = useState()
  const [passWord, setPassword] = useState()
  const [routeTo, setRouteTo] = useState()

  const notify = () => {
    if(userName === 'admin'){
      if(passWord === 'IceTheDreamer'){
        return(setRouteTo('/admin'))
      }
      else{
        alert('Wrong password!')
      }
    }
    else{
      const userExists = usersLists.find(user => user === userName);
      if(userExists){
        return(setRouteTo('/employee'))
      }
      else{
        alert('Wrong!')
      }
    }
  }
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
                <Link to={routeTo} type='submit' onClick={notify}>Submit</Link>
            </form>
        </div>
    </div>
  )
}

export default LoginPage