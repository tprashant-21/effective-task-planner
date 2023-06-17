import React, { useEffect } from 'react';
import './styles.css';
import { Tracker } from '../tracker';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';


type Props = {
    task: Tracker;
    tasks: Tracker[];
    setTasks: React.Dispatch<React.SetStateAction<Tracker[]>> ;
}

const TaskCard = ({task, tasks, setTasks}:Props) => {

    const [edit, setEdit] = React.useState<boolean>(false);
    const [editTask, setEditTask] = React.useState<string>(task.task);

    useEffect(() => {
        inputRef.current?.focus();
    },[edit])

    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleDone = (id: number) => {    
        setTasks(tasks.map((task) => task.id === id ? {...task, isDone: !task.isDone} : task))
    };

    const handleDelete = (id: number) => {    
        setTasks(tasks.filter((task) =>  task.id !== id))
    };

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTasks(tasks.map((task) => task.id === id ? {...task, task: editTask} : task))
        setEdit(false);
    }

  return (
    <form className='task__single' onSubmit={(e) => handleEdit(e, task.id)}>
        {edit ? 
        (
            <input type='input' ref={inputRef} value={editTask} onChange={(e)=>setEditTask(e.target.value)} className='task__single--text'/>
        ) : task.isDone ? 
            (<s className='task__single--text'>
                {task.task}
            </s>)
            :(<span className='task__single--text'>
                {task.task}
            </span>)
        }

        <div>
            <span className='icon' onClick={()=>{if(!edit && !task.isDone)setEdit(!edit)}} > <AiFillEdit /> </span>
            <span className='icon' onClick={()=>handleDelete(task.id)} > <AiFillDelete /> </span>
            <span className='icon' onClick={()=>handleDone(task.id)} > <MdDone />  </span>
        </div>

    </form>
  )
}

export default TaskCard;