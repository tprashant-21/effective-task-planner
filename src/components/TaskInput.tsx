import React, {useRef} from 'react';
import './styles.css';

interface Props {
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const TaskInput = ({task, setTask, handleAdd}: Props) => {

    const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className='input' onSubmit={(e)=>{
        handleAdd(e);
        inputRef.current?.blur();
        }}>

        <input ref={inputRef} type='input' value={task} onChange={(e)=>setTask(e.target.value)} placeholder={`Enter a task and hit 'Enter'`} className='input__box'></input>

    </form>
  )
}

export default TaskInput