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
            (provided, snapshot) => (
              <div className={`tasks ${snapshot.isDraggingOver? `dragactive`: ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                <span className="tasks__heading">Active Tasks</span>
                {
                  tasks?.map((task, index) => <TaskCard index={index} key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)
                }
                {provided.placeholder}
              </div>
                )
          }

        </Droppable>

        <Droppable droppableId="TasksRemove">

        {
            (provided, snapshot) => (
              <div className={`tasks ${snapshot.isDraggingOver? `dragcomplete`: 'remove'}`} ref={provided.innerRef}{...provided.droppableProps}>
                <span className="tasks__heading">Completed Tasks</span>
                {
                  completedTasks?.map((task, index) => <TaskCard index={index} key={task.id} task={task} tasks={completedTasks} setTasks={setCompletedTasks} />)
                }
                {provided.placeholder}
              </div>
            )
          }

        </Droppable>

      </div>
    
  )
}

export default TaskList;