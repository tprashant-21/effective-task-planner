import React from 'react';
import "./styles.css";
import { Tracker } from '../tracker';
import TaskCard from './TaskCard';
import { Droppable } from 'react-beautiful-dnd';
import { AiFillStar } from 'react-icons/ai';

interface Props {
    tasks: Tracker[];
    setTasks: React.Dispatch<React.SetStateAction<Tracker[]>> ;
    immediateTasks: Tracker[];
    setimmediateTasks: React.Dispatch<React.SetStateAction<Tracker[]>>;
    importantTasks: Tracker[];
    setImportantTasks: React.Dispatch<React.SetStateAction<Tracker[]>>;
    rememberTasks: Tracker[];
    setRememberTasks: React.Dispatch<React.SetStateAction<Tracker[]>>;
}

const TaskList: React.FC<Props> = ({tasks, setTasks, immediateTasks, setimmediateTasks, importantTasks, setImportantTasks, rememberTasks, setRememberTasks}) => {
  return (
    
      <div className="container">

        <Droppable droppableId="WaitList">

          {
            (provided, snapshot) => (
              <div className={`tasks ${snapshot.isDraggingOver? `dragactive`: ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                <span className="tasks__heading">Pending Tasks  </span>
                {
                  tasks?.map((task, index) => <TaskCard index={index} key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)
                }
                {provided.placeholder}
              </div>
                )
          }

        </Droppable>

        <Droppable droppableId="TasksImmediate">

        {
            (provided, snapshot) => (
              <div className={`tasks ${snapshot.isDraggingOver? `dragcomplete`: 'remove'}`} ref={provided.innerRef}{...provided.droppableProps}>
                <span className="tasks__heading">Immediate-Urgent Tasks <AiFillStar /> <AiFillStar /> <AiFillStar /></span>
                {
                  immediateTasks?.map((task, index) => <TaskCard index={index} key={task.id} task={task} tasks={immediateTasks} setTasks={setimmediateTasks} />)
                }
                {provided.placeholder}
              </div>
            )
          }

        </Droppable>

        <Droppable droppableId="TasksImportant">

        {
            (provided, snapshot) => (
              <div className={`tasks ${snapshot.isDraggingOver? `dragcomplete`: 'remove'}`} ref={provided.innerRef}{...provided.droppableProps}>
                <span className="tasks__heading">Important-but-can-wait Tasks <AiFillStar /> <AiFillStar /></span>
                {
                  importantTasks?.map((task, index) => <TaskCard index={index} key={task.id} task={task} tasks={importantTasks} setTasks={setImportantTasks} />)
                }
                {provided.placeholder}
              </div>
            )
          }

        </Droppable>

        <Droppable droppableId="TasksRemember">

        {
            (provided, snapshot) => (
              <div className={`tasks ${snapshot.isDraggingOver? `dragcomplete`: 'remove'}`} ref={provided.innerRef}{...provided.droppableProps}>
                <span className="tasks__heading">Don't-forget-me Tasks <AiFillStar /></span>
                {
                  rememberTasks?.map((task, index) => <TaskCard index={index} key={task.id} task={task} tasks={rememberTasks} setTasks={setRememberTasks} />)
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