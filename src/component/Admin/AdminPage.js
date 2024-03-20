import React from 'react'
import SideNav from './SideNav'
import DragNDrop from './DragNDrop'
import { getDocs, collection } from 'firebase/firestore/lite';
import {db} from '../../firebase';

const pendingCol = collection(db, 'pending');
const pendingSnapshot = await getDocs(pendingCol);
const pendingLists = pendingSnapshot.docs.map(doc => doc.data().name);
console.log(pendingLists)

const usersCol = collection(db, 'users');
const usersSnapshot = await getDocs(usersCol);
const usersLists = usersSnapshot.docs.map(doc => doc.data().UserName);
const onGoingTasks = usersSnapshot.docs.map(doc => doc.data().OnGoingTask);
const pendingTasks = usersSnapshot.docs.map(doc => doc.data().totalPending);
const completedListss = usersSnapshot.docs.map(doc => doc.data().UserName);
console.log(pendingTasks)

const data = [
  {title: 'Pending Tasks', items: pendingLists}
];


function AdminPage() {
  return (
    <div className='AdminPage'>
        <div className='Side-nav'>
            <SideNav data={data} />
        </div>
        <div className='Display-todos'>
            <header className='App-header'>
            <DragNDrop data={data} userLists={usersLists} onGoingTask={onGoingTasks} pendingTasks={pendingTasks}/>
            </header>
        </div>
        {/* {users.map((userrr, index) =>(
          <div key={index}><h1>{userrr}</h1></div>
        ))} */}
    </div>
  )
}

export default AdminPage