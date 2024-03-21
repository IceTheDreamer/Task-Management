import React, { useEffect, useState } from 'react'
import SideNav from './SideNav/SideNav'
import DragNDrop from './DragNDrop'

function AdminPage() {
  const [todos, setTodos] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    showTodo();
    showUsers();
  }, []);
  
  const showUsers = () => {
    fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(data => {
      const userId = data.users.map(data => data.id);
      const users = data.users.map(data => data.firstName);
      setAllUsers(users)
      console.log(userId)
    });
  }
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
  if (allUsers.length === 0) {
    return <div>Loading users...</div>;
  }
  const userList = allUsers;
  
  console.log(taskList);
  return (
    <div className='AdminPage'>
        <div className='Side-nav'>
            <SideNav data={taskList} />
        </div>
        <div className='Display-todos'>
            <header className='App-header'>
              {/* <DragNDrop userLists={userList} /> */}
            </header>
        </div>
        {/* {users.map((userrr, index) =>(
          <div key={index}><h1>{userrr}</h1></div>
        ))} */}
    </div>
  )
}

export default AdminPage