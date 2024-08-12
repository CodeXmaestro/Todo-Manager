import { useEffect, useState } from 'react';
import TaskInputForm from './components/taskInputForm/TaskInputForm';
import ListItem from './components/listItem/ListItem';
import './App.css';

function App() {

    const [tasks, setTasks] = useState([]);
    const [initaialState, setInitaialState] = useState(true);

    let storageKey = "tasks";

    if (initaialState) {

        load();
        setInitaialState(false);

    }

    function addTask(taskName) {

        let task = {

            task: taskName,
            checked: false,

        };

        setTasks([...tasks, task]);

    }

    function deleteTask(index) {

        let taskList = tasks.filter((task, idx) => {
            
            return idx !== index && task
        
        });

        setTasks(taskList);

    }

    function updateTask(task, index) {
        
        tasks[index] = task;

        setTasks([...tasks]);

    }

    function save() {

        let taskObject = JSON.stringify(tasks);

        localStorage.setItem(storageKey, taskObject);

    }

    function load() {

        let taskObject = localStorage.getItem(storageKey);
        let taskList = JSON.parse(taskObject) || [];

        setTasks(taskList);

    }

    useEffect(save, [tasks]);

    return (

        <>

            <TaskInputForm onSubmit={addTask} />

            <ul>

                {!tasks.length && <p>No Tasks</p>}

                {tasks.map((task, index) => {

                    return (

                        <ListItem key={index} task={task} index={index} onChange={updateTask} onDelete={deleteTask} />

                    )
                    
                })}

            </ul>

        </>

    )
}

export default App;
