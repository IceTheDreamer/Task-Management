import React, { useEffect, useState } from 'react'
import SideNav from './SideNav/SideNav'
import DragNDrop from './DragNDrop'
import { Search } from 'react-bootstrap-icons';

function AdminPage() {
  const [todos, setTodos] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersId, setAllUsersId] = useState([]);
  const [usersTodoss, setUsersTodos] = useState([]);

  useEffect(() => {
    showAllTodo();
    showUsers();
  }, []);
  
  const showUsers = () => {
    fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(userData => {
      const userIds = userData.users.map(user => user.id);
      const users = userData.users.map(user => user.firstName);
      setAllUsers(users);
      setAllUsersId(userIds);

      const usersTodosObj = {}; // Object to store todos for each user

      // Fetch todos for each user
      const todosPromises = userIds.map(userId => {
        return fetch(`https://dummyjson.com/todos/user/${userId}`)
          .then(res => res.json())
          .then(todoData => {
            usersTodosObj[userId] = todoData.todos; // Store todos for each user
          })
          .catch(error => console.error('Error fetching todos:', error));
      });

      // Wait for all todo requests to finish
      Promise.all(todosPromises)
        .then(() => {
          // Convert usersTodosObj to an array of todos for each user
          const usersTodosArray = userIds.map(userId => ({
            userId: userId,
            todos: usersTodosObj[userId]
          }));
          
          setUsersTodos(usersTodosArray); // Set usersTodos array
          //console.log(usersTodosArray); // Logging for verification
        })
        .catch(error => console.error('Error fetching todos:', error));
    })
    .catch(error => console.error('Error fetching users:', error));
}
  const showAllTodo = () => {
    fetch('https://dummyjson.com/todos')
    .then(res => res.json())
    .then(data => {
        const todos = data.todos.map(todo => todo.todo);
        setTodos(todos)
    })
    .catch(error => console.error('Error fetching todos:', error));
  }

  const taskList = [
    {title: 'Pending Tasks', items: todos}
  ]
  if (allUsers.length === 0 && allUsersId === 0) {
    return <div>Loading users...</div>;
  }

  
  const userList = allUsers;
  // const completedTasks = usersTodoss.filter(todo => todo.completed);
  // const pendingTasks = usersTodoss.filter(todo => !todo.completed);
  if(usersTodoss.length === 0){
    return <div>Loading...</div>
  }
  const allTasks = usersTodoss;
  return (
    <div className='AdminPage'>
        <div className='Side-nav'>
            <SideNav data={taskList} />
        </div>
        <div className='Display-todos'>
            <div className='all-todos'>
              <div className='search-box'>
                <input placeholder='Search'></input><Search className='icon'/>
              </div>
              {/* <DragNDrop userLists={userList} pendingTasks={pendingTasks}/> */}
              <DragNDrop userLists={userList} allTasks={allTasks}/>
            </div>
        </div>
        {/* {users.map((userrr, index) =>(
          <div key={index}><h1>{userrr}</h1></div>
        ))} */}
    </div>
  )
}

export default AdminPage