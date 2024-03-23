import React, { useRef, useState } from 'react'
// import { db } from '../../firebase';
// import { addDoc, collection, deleteDoc, getDocs, query, where, doc } from 'firebase/firestore/lite';

function DragNDrop(props) {
  
    const users = props.userLists;
    const allTasks = props.allTasks;
   // console.log(allTasks[0].todos[0].todo)
    ///const tasks = props.onGoingTask;
    //const pending = props.pendingTasks;
    // const [list, setList] = useState(props.data);
    // const [dragging, setDragging] = useState(false);
  
    // const dragItem = useRef();
    // const dragNode = useRef();

    // const handleDragStart = (e, params) => {
    //     console.log('drag starting...', params)
    //     dragItem.current = params;
    //     dragNode.current = e.target;
    //     dragNode.current.addEventListener('dragend', handleDragEnd)
    //     setTimeout(() => {
    //         setDragging(true)
    //     }, 0)
    // }

    // const handleDragEnter = (e, params) => {
    //   console.log('Entering drag...', params)
    //   const currentItem = dragItem.current;
    //   if(e.target !== dragNode.current){
    //     console.log("TARGET IS NOT THE SAME")
    //     setList(oldList => {
    //       let newList = JSON.parse(JSON.stringify(oldList));
    //       newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI,1)[0])
    //       dragItem.current = params
    //       return newList
    //     })
    //   }
    // }

    // const handleDragEnd = () => {
    //     savingDragged(dragItem.current)
    //     console.log('Ending drag...', dragItem.current.item)
    //     setDragging(false)
    //     dragNode.current.removeEventListener('dragend', handleDragEnd)
    //     dragItem.current = null;
    //     dragNode.current = null;
    // }
    // const getStyles = (params) => {
    //     const currentItem = dragItem.current;
    //     if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI){
    //         return 'current dnd-item'
    //     }
    //     return 'dnd-item'
    // }
    // const addToDatabase = async (Cols, dataa) => {
    //   await addDoc(Cols, {name:dataa});
    //   alert('Changed/Added!')
    // }
    // const deleteToDatabase = async (Cols, dataa, group) => {
    //   let datta = ""
    //   const q = query(Cols, where("name", "==", dataa));
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //     datta = doc.id
    //   });
    //   const namee = String(datta)
    //   console.log(namee)
    //   await deleteDoc(doc(db, group, namee));
    //   console.log('deleted!')
    // }
    // const savingDragged = (params) => {
    //     const dataa = params.item
    //     if(params.grpI === 0){
    //       const Cols = collection(db, 'todos')
    //       addToDatabase(Cols, dataa)
    //       const Cols2 = collection(db, 'completed')
    //       const group = "completed"
    //       deleteToDatabase(Cols2, dataa, group)
    //     }
    //     else{
    //       const Cols = collection(db, 'completed')
    //       addToDatabase(Cols, dataa)
    //       const Cols2 = collection(db, 'todos')
    //       const group = "todos"
    //       deleteToDatabase(Cols2, dataa, group)
    //     }
    // }

    const [isBusy, setIsBusy] = useState(false);
  return (
    <div className='admin-drag-n-drop'>
      <div className='userProfile'>
        {users.map((user, index) =>{
         const userTasks = allTasks[index].todos;
          const completedTasks = userTasks.filter(task => task.completed === true);
          const pendingTasks = userTasks.filter(task => task.completed === false);
          const isTaskNA = pendingTasks.length === 0;
          const isBusy = isTaskNA ? false : true;

          return (
            <div 
              key={index} 
              className='admin-dnd-group'
            >
              <div className='admin-group-title'>
                {user}
                <div className={isBusy? 'sign busy':'sign vacant'}></div>
              </div>
              <div className='task-details'>
              <p>Pending: {pendingTasks.length}</p>
                {/* <p>Pending: {pending[index]}</p> */}
                <p>Completed: {completedTasks.length}</p>
              </div>
              {/* <p className='task-item'>Ongoing Task: <br /><span className='admin-dnd-item'>{tasks[index]}</span></p> */}
              <p className='task-item'>Pending Tasks: <br />
              {allTasks[index].todos && allTasks[index].todos.length > 0 && (
                allTasks[index].todos
                  .filter(task => !task.completed) // Filter out completed tasks
                  .map(task => (
                    <span key={task.id} className='admin-dnd-item'>{task.todo}<br /></span>
                  ))
              )}
              <span className='admin-dnd-item'></span>
            </p>
            </div>
          );
        })}
      </div>
          
    </div>
  )
}

export default DragNDrop