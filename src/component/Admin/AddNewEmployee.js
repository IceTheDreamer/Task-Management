import React, { useState } from 'react'
import Modal from './Modal'
import TodoForm from './TodoFrom';

function AddNewTodo() {
  const [showModal, setShowModal] = useState(false)
  //const [text, setText] = useState('')

  return (
    <div className='AddNewTodo'>
        <div className="btn" onClick={() => setShowModal(true)}>
          <button>
            + New Employee
          </button>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <TodoForm 
          name='Add Employee'
          placeHolder='Name'
          //text={text}
         // setText={setText}
          showButtons={true}
          setShowModal={setShowModal}
          type={true}
          />
        </Modal>
    </div>
  )
}

export default AddNewTodo;