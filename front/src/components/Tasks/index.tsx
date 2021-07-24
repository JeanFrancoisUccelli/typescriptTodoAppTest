import React, { useState } from 'react';
import { Task } from '../../../src/interfaces/Task';
import axios from 'axios';

// import CSS
import './Tasks.scss';

interface TasksProps {
    tasks: Array<Task>;
    getDataFromAPI: () => void;
};

const Tasks: React.FC<TasksProps> = ({ tasks, getDataFromAPI }) =>  {

    const [valueTask, setvalueTask] = useState<string>("");
    const [editTaskId, setEditTaskId] = useState<string>("");
    
// REMOVE TASK
    const removeTask = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {  
        // GET ID   
        const taskId: string = (event.target as HTMLDataElement).id;
        // REQUEST 
        axios.delete(`http://localhost:1337/tasks/${taskId}`)
        .then((response) => {
          console.log(response.status);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
            // REFRESH LIST WITH A NEW REQUEST
            getDataFromAPI()
        });        
    };
// TASK COMPLETED
    const completedTask = (event: React.ChangeEvent<HTMLInputElement>) => { 
        // GET ID   
        const taskId: string = event.target.id;
        // GET VALUE CHECKBOX
        const completed: boolean = event.target.checked;

        axios({
            method: 'put',
            url: `http://localhost:1337/tasks/${taskId}`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data: {
              "completed": completed
            }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
            // REFRESH LIST WITH A NEW REQUEST
            getDataFromAPI()
        });
    }; 
// SHOW LABEL IF TASK SELECTED
    const displayInput = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        setEditTaskId((event.target as HTMLDataElement).id);
    }; 
// GET A NEW VALUE
    const updateTask = (event: React.ChangeEvent<HTMLInputElement>) => {
        setvalueTask((event.target as HTMLDataElement).value);
    };
// SUBMIT THE NEW TASK
    const submitUpdateTask = (event: React.FormEvent) => {
        event.preventDefault();

        if (!valueTask || /^s*$/.test(valueTask)) {
            return;
        } 
                axios({
                    method: 'put',
                    url: `http://localhost:1337/tasks/${editTaskId}`,
                    headers: { 
                      'Content-Type': 'application/json'
                    },
                    data: {
                      "content": valueTask
                    }
                })
                .catch((error) => {
                  console.error(error);
                })
                .finally(() => {
                    // REFRESH LIST AND INITIALIZE STATE
                    getDataFromAPI();
                    setvalueTask('');
                    setEditTaskId('');
                });

    };


    return (
        <form
            onSubmit={submitUpdateTask}
        >
            <ul className="tasks">
                {tasks.map((task) =>(
                    <li key={task.id} className={task.completed ? 'task task--completed' : 'task'}>
                        {editTaskId === task.id ? ( 
                            <input
                                className="task-input"
                                type="text"
                                id={task.id}
                                placeholder="mode édition"
                                value={valueTask}
                                onChange={updateTask}
                                
                            />
                                )
                                : 
                                <label
                                className={task.completed ? 'task-label task-label--completed' : 'task-label'}
                                id={task.id}
                                onClick={displayInput}
                            >
                                {task.content}
                            </label> }  
                    <div className="task-containerBtn">
                        <input
                          type="checkbox"
                          id={task.id}
                          defaultChecked={task.completed}
                          onChange={completedTask}
                        />
                        <i
                        id={task.id}
                        className="fas fa-trash button button-trash"
                        onClick={removeTask}
                        />
                        <i
                        id={task.id}
                        className="fa fa-pencil" aria-hidden="true"
                        onClick={() => setEditTaskId(task.id)}
                        />
                    </div>
                </li>
                ))}
            </ul>
        </form>
    );
};



export default Tasks;
