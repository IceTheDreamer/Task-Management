import React, { useEffect, useState } from 'react'
import DragNDrop from './DragNDrop'
import { addDoc, collection, deleteDoc, getDocs, query, where, doc  } from 'firebase/firestore/lite';
import { db } from '../../firebase';

const todosCol = collection(db, 'users');
const todosSnapshot = await getDocs(todosCol);
const todosLists = todosSnapshot.docs.map(doc => doc.data().PendingTasks);
// console.log(todosLists)


const onGoingTaskCol = collection(db, 'users');
const onGoingTaskSnapshot = await getDocs(onGoingTaskCol);
const onGoingTask = onGoingTaskSnapshot.docs.map(doc => doc.data().OnGoingTask);
// console.log(onGoingTask)

const completedCol = collection(db, 'users');
const completedSnapshot = await getDocs(completedCol);
const completedLists = completedSnapshot.docs.map(doc => doc.data().CompletedTask);
// console.log(completedLists)


function Employee({userName}) {
  const [pendingT, setPendingTas] = useState()
  const [onGoingT, setOnGoingT] = useState();
  const [completedT, setCompletedT] = useState();

  useEffect(() => {
    const getInformation = async () => {
      const q = query(todosCol, where('UserName', '==', userName));
      const querySnapshot = await getDocs(q);
      const qer = querySnapshot.docs.map((doc) => doc.data().PendingTasks);
      const qer1 = querySnapshot.docs.map((doc) => doc.data().OnGoingTask);
      const qer2 = querySnapshot.docs.map((doc) => doc.data().CompletedTask);

      setPendingTas(qer);
      setOnGoingT(qer1);
      setCompletedT(qer2);
    };

    getInformation();
  }, [userName]);

  const data1 = [
    {title: 'Pending Tasks1', items: pendingT},
    {title: 'Ongoing Task1', items: onGoingT},
    {title: 'Completed Tasks1', items: completedT}
  ]
  console.log(data1);
  const data = [
    {title: 'Pending Tasks', items: todosLists},
    {title: 'Ongoing Task', items: onGoingTask},
    {title: 'Completed Tasks', items: completedLists}
  ]
  console.log(data);
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