import React, { useEffect, useState } from 'react'
import DragNDrop from './DragNDrop'
import { userInApiData } from '../UserFolder/UserData';
import Header from './Header';

function Employee() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (userInApiData.length > 0) {
      showTodo();
    }
  }, [userInApiData]);
  
  const showTodo = () => {
    fetch(`https://dummyjson.com/todos/user/${userInApiData[0].id}`)
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
  const data = [
    {title: 'Pending Tasks', items: todos}
  ]
  console.log(userInApiData[0].id);
  return (
    <div className='Employee'>
      <Header></Header>
        <div className='Display-todos'>
            <header className='App-header'>
            <DragNDrop data={data}/>
            </header>
        </div>
    </div>
  )
}

export default Employee