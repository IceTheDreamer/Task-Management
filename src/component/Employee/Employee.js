import React, { useEffect, useState } from 'react'
import DragNDrop from './DragNDrop'
import { useParams } from 'react-router-dom'

function Employee() {
  const [todos, setTodos] = useState([]);
  
  const { userName } = useParams();

  useEffect(() => {
    showTodo();
  }, []);
  
  const showTodo = () => {
    fetch('https://dummyjson.com/todos/user/5')
    .then(res => res.json())
    .then(data => {
        const todos = data.todos.map(todo => todo.todo);
        setTodos(todos)
    })
    .catch(error => console.error('Error fetching todos:', error));
  }

  if (todos.length === 0) {
    return <div>Loading todos...</div>;
  }

  const todosLists = ['sad', 'sada']
  const data = [
    {title: 'Pending Tasks', items: todos}
  ]
  console.log(data);
  console.log(userName);

  return (
    <div className='Employee'>
        <div className='Display-todos'>
            <header className='App-header'>
            <DragNDrop data={data}/>
            </header>
        </div>
    </div>
  )
}

export default Employee