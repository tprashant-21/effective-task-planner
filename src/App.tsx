import { useState } from 'react'
import './App.css'
import TaskInput from './components/TaskInput';
import { Tracker } from './tracker';

const App: React.FC = () => {

  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Tracker[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(task){
      setTasks([...tasks, {task: task, id: Date.now(), isDone: false}]);
      setTask("");
    }
  };

  return (
      <div className='app'>
        <h1 className='heading'>EFFECTIVE TASK PLANNER</h1>
        <TaskInput task={task} setTask={setTask} handleAdd = {handleAdd} />
        {tasks.map((t) => (
          <li>{t.task}</li>
        ))}
      </div>
  )
}

export default App
