import { useState } from 'react'
import './App.css'
import TaskInput from './components/TaskInput';
import { Tracker } from './tracker';
import TaskList from './components/TaskList';
import {DragDropContext} from 'react-beautiful-dnd';


const App: React.FC = () => {

  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Tracker[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Tracker[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(task){
      setTasks([...tasks, {task: task, id: Date.now(), isDone: false}]);
      setTask("");
    }
  };

  return (
    <DragDropContext>

      <div className='app'>
        <h1 className='heading'>EFFECTIVE TASK PLANNER</h1>
        <TaskInput task={task} setTask={setTask} handleAdd = {handleAdd} />
        <TaskList tasks={tasks} setTasks={setTasks} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} />
      </div>

    </DragDropContext>
  )
}

export default App
