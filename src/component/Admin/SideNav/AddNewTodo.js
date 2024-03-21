import React, { useState } from 'react'
import Modal from './Modal'
import TodoForm from '../TodoFrom';

function AddNewTodo() {
  const [showModal, setShowModal] = useState(false)
  //const [text, setText] = useState('')

  return (
    <div className='AddNewTodo'>
        <div className="btn" onClick={() => setShowModal(true)}>
          <button>
            + New Task
          </button>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <TodoForm 
          //text={text}
         // setText={setText}
          showButtons={true}
          setShowModal={setShowModal}
          />
        </Modal>
    </div>
  )
}

export default AddNewTodo;