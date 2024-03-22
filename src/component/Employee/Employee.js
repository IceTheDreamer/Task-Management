import React, { useEffect, useState } from 'react'
import DragNDrop from './DragNDrop'
import { userInApiData } from '../UserFolder/UserData';
import Header from './Header';

function Employee() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    if (userInApiData.length > 0) {
      showTodo();
    }
  }, [userInApiData]);
  
  const showTodo = () => {
    fetch(`https://dummyjson.com/todos/user/${userInApiData[0].id}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        setTodos(data.todos);
    })
    .catch(error => console.error('Error fetching todos:', error));
  }

  if (todos.length === 0) {
    return <div>Loading todos...</div>;
  }
  const completedTasks = todos.filter(todo => todo.completed);
  const pendingTasks = todos.filter(todo => !todo.completed);
  const data = [
    {title: 'Pending Tasks', items: pendingTasks.map(todo => todo.todo)},
    {title: 'Completed Tasks', items: completedTasks.map(todo => todo.todo)}
  ]
  
  return (
    <div className='Employee'>
      <Header name={userInApiData[0].firstName + " " + userInApiData[0].lastName}></Header>
        <div className='Display-todos'>
            <header className='App-header'>
            <DragNDrop data={data}/>
            </header>
        </div>
    </div>
  )
}

export default Employee