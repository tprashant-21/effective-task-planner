import React, { useState } from 'react'
import './App.css'
import TaskInput from './components/TaskInput';
import { Tracker } from './tracker';
import TaskList from './components/TaskList';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';


const App: React.FC = () => {

  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Tracker[]>([]);
  const [immediateTasks, setimmediateTasks] = useState<Tracker[]>([]);
  const [importantTasks, setImportantTasks] = useState<Tracker[]>([]);
  const [rememberTasks, setRememberTasks] = useState<Tracker[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(task){
      setTasks([...tasks, {task: task, id: Date.now(), isDone: false}]);
      setTask("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const {destination, source} = result;

    if(!destination || destination.index === source.index && destination.droppableId === source.droppableId){
      return;
    }

    let add;
    let active = tasks;
    let immediate = immediateTasks;
    let important = importantTasks;
    let remember = rememberTasks;

    if(source.droppableId === "TasksImmediate"){
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = immediate[source.index];
      immediate.splice(source.index, 1);
    }

    if(destination.droppableId === "TasksImmediate"){
      active.splice(destination.index, 0, add);
    }else{
      immediate.splice(destination.index, 0, add);
    }

    if(source.droppableId === "TasksImportant"){
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = important[source.index];
      important.splice(source.index, 1);
    }

    if(destination.droppableId === "TasksImportant"){
      active.splice(destination.index, 0, add);
    }else{
      important.splice(destination.index, 0, add);
    }

    if(source.droppableId === "TasksImportant"){
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = remember[source.index];
      remember.splice(source.index, 1);
    }

    if(destination.droppableId === "TasksImportant"){
      active.splice(destination.index, 0, add);
    }else{
      remember.splice(destination.index, 0, add);
    }

    setimmediateTasks(immediate);
    setRememberTasks(remember);
    setImportantTasks(important);
    setTasks(active);
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <div className='app'>
        <h1 className='heading'>EFFECTIVE TASK PLANNER</h1>
        <TaskInput task={task} setTask={setTask} handleAdd = {handleAdd} />
        <TaskList 
        tasks={tasks} setTasks={setTasks} 
        immediateTasks={immediateTasks} setimmediateTasks={setimmediateTasks} 
        importantTasks={importantTasks} setImportantTasks={setImportantTasks}
        rememberTasks={rememberTasks} setRememberTasks={setRememberTasks}
        />
      </div>

    </DragDropContext>
  )
}

export default App
