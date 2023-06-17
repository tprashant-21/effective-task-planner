import React from 'react';
import "./styles.css";
import { Tracker } from '../tracker';
import TaskCard from './TaskCard';
import { Droppable } from 'react-beautiful-dnd';

interface Props {
    tasks: Tracker[];
    setTasks: React.Dispatch<React.SetStateAction<Tracker[]>> ;
    completedTasks: Tracker[];
    setCompletedTasks: React.Dispatch<React.SetStateAction<Tracker[]>> ;
}

const TaskList: React.FC<Props> = ({tasks, setTasks, completedTasks, setCompletedTasks}) => {
  return (
    
      <div className="container">

        <Droppable droppableId="TasksList">

          {
            (provided) => (
              <div className="tasks" ref={provided.innerRef}{...provided.droppableProps}>
                <span className="tasks__heading">Active Tasks</span>
                {
                  tasks.map((task, index) => <TaskCard index={index} key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)
                }
              </div>
                )
          }

        </Droppable>

        <Droppable droppableId="TasksRemove">

        {
            (provided) => (
              <div className="tasks remove" ref={provided.innerRef}{...provided.droppableProps}>
                <span className="tasks__heading">Completed Tasks</span>
                {
                  tasks.map((task) => <TaskCard key={task.id} task={task} tasks={completedTasks} setTasks={setCompletedTasks} />)
                }
              </div>
            )
          }

        </Droppable>

      </div>
    
  )
}

export default TaskList;