import React, { useEffect, useState } from 'react'
import SideNav from './SideNav/SideNav'

function AdminPage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    showTodo();
  }, []);
  
  const showTodo = () => {
    fetch('https://dummyjson.com/todos')
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

  const taskList = [
    {title: 'Pending Tasks', items: todos}
  ]
  console.log(taskList);
  return (
    <div className='AdminPage'>
        <div className='Side-nav'>
            <SideNav data={taskList} />
        </div>
        <div className='Display-todos'>
            <header className='App-header'>
            </header>
        </div>
        {/* {users.map((userrr, index) =>(
          <div key={index}><h1>{userrr}</h1></div>
        ))} */}
    </div>
  )
}

export default AdminPage