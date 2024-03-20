import React, { useRef, useState } from 'react'
import { db } from '../../firebase';
import { addDoc, collection, deleteDoc, getDocs, query, where, doc } from 'firebase/firestore/lite';

function DragNDrop({data}) {

    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);

    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) => {
        console.log('drag starting...', params)
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(() => {
            setDragging(true)
        }, 0)
    }

    const handleDragEnter = (e, params) => {
      console.log('Entering drag...', params)
      const currentItem = dragItem.current;
      if(e.target !== dragNode.current){
        console.log("TARGET IS NOT THE SAME")
        setList(oldList => {
          let newList = JSON.parse(JSON.stringify(oldList));
          newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI,1)[0])
          dragItem.current = params
          return newList
        })
      }
    }

    const handleDragEnd = () => {
        savingDragged(dragItem.current)
        console.log('Ending drag...', dragItem.current.item)
        setDragging(false)
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragItem.current = null;
        dragNode.current = null;
    }
    const getStyles = (params) => {
        const currentItem = dragItem.current;
        if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI){
            return 'current dnd-item'
        }
        return 'dnd-item'
    }
    const addToDatabase = async (Cols, dataa) => {
      await addDoc(Cols, {name:dataa});
      alert('Changed/Added!')
    }
    const deleteToDatabase = async (Cols, dataa, group) => {
      let datta = ""
      const q = query(Cols, where("name", "==", dataa));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        datta = doc.id
      });
      const namee = String(datta)
      console.log(namee)
      await deleteDoc(doc(db, group, namee));
      console.log('deleted!')
    }
    const savingDragged = (params) => {
        const dataa = params.item
        if(params.grpI === 0){
          const Cols = collection(db, 'todos')
          addToDatabase(Cols, dataa)
          const Cols2 = collection(db, 'completed')
          const group = "completed"
          deleteToDatabase(Cols2, dataa, group)
        }
        else{
          const Cols = collection(db, 'completed')
          addToDatabase(Cols, dataa)
          const Cols2 = collection(db, 'todos')
          const group = "todos"
          deleteToDatabase(Cols2, dataa, group)
        }
    }
  return (
    <div className='drag-n-drop'>
          {list.map((grp, grpI) =>(
            <div 
              key={grp.title} 
              className='dnd-group'
              onDragEnter={dragging && !grp.items.length?(e) => handleDragEnter(e, {grpI, itemI:0}):null}
            >
              <div className='group-title'>{grp.title}</div>
              {grp.items.map((item, itemI) => (
                <div 
                draggable 
                onDragStart={(e) => {handleDragStart(e, {grpI, itemI, item})}} 
                onDragEnter={dragging?(e) => {handleDragEnter(e, {grpI, itemI, item})}:null}
                key={item} 
                className={dragging? getStyles({grpI, itemI}):'dnd-item'}
                >
                  {Array.isArray(item)?
                  (
                    item[0]):
                    (item)
                }
                </div>
              ))}
            </div>
          ))}
    </div>
  )
}

export default DragNDrop