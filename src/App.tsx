import React, { useState } from 'react'
import './App.css'
import TaskInput from './components/TaskInput';
import { Tracker } from './tracker';
import TaskList from './components/TaskList';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';


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

  const onDragEnd = (result: DropResult) => {
    const {destination, source} = result;

    if(!destination || destination.index === source.index && destination.droppableId === source.droppableId){
      return;
    }

    let add;
    let active = tasks;
    let completed = completedTasks;

    if(source.droppableId === "TasksList"){
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if(destination.droppableId === "TasksList"){
      active.splice(destination.index, 0, add);
    }else{
      completed.splice(destination.index, 0, add);
    }

    setCompletedTasks(completed);
    setTasks(active);
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <div className='app'>
        <h1 className='heading'>EFFECTIVE TASK PLANNER</h1>
        <TaskInput task={task} setTask={setTask} handleAdd = {handleAdd} />
        <TaskList tasks={tasks} setTasks={setTasks} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks} />
      </div>

    </DragDropContext>
  )
}

export default App
