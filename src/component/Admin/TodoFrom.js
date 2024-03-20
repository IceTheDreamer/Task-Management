import React, {useReducer, useState} from 'react'
import {X} from 'react-bootstrap-icons'
import {addDoc, collection} from 'firebase/firestore/lite'
import { db } from '../../firebase'

function TodoForm({
   // text, setText,
    showButtons = false,
    setShowModal = false,
    name, placeHolder,type
}) {
  const [forEmployee, setForEmployee] = useState(!type)
  const [text, setText] = useState()
  const [password, setPassword] = useState()
  const [task, setTask] = useState()
  // const addToToDo = (event) =>{
  //   event.preventDefault();
  //   lists.push(text.Todo)
  //   lists.map((data) => (
  //     console.log(data)
  //     )
  //   )
  // }
  const tasksDbRef = collection(db, 'pending')
  const employeeDbRef = collection(db, 'users')
  const send = async (event) => {
    try{
      event.preventDefault();
      if(forEmployee === false){
        await addDoc(employeeDbRef, {UserName:text, PassWord:password, OnGoingTask:task})
      }
      else{
        await addDoc(tasksDbRef, {name:text})
      }
      
      alert('data sent')
      refreshed()
    }
    catch(error){
      alert(error)
    }
  }
  const refreshed = () => {
     window.location.reload();
   }
  return (
          <form className='TodoForm'>
              <div className="text">
                    <h3>{name}</h3>
                <input
                type='text'
                name='Todo'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={placeHolder}
                autoFocus />
                <input 
                type='text' 
                name='passWord'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={forEmployee? {display:"none"}:null} 
                />
                <input 
                type='text' 
                name='task'
                placeholder='Assign a task...' 
                value={task}
                onChange={(e) => setTask(e.target.value)}
                style={forEmployee? {display:"none"}:null} 
                />
              </div>
              
              {
                showButtons &&
                <div>
                    <div className="cancel">
                        <X size='40' onClick={() => setShowModal(false)}/>
                    </div>
                    <div className="confirm">
                        <button type='submit' onClick={send}>+ {name}</button>
                    </div>
                </div>
              }
            </form>
  )
}

export default TodoForm;