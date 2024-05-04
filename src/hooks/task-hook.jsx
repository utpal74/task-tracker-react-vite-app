
import { createContext, useContext, useEffect, useState } from "react"
import { nanoid } from "nanoid";
import taskData from "../assets/task-data.json"

const TaskContext = createContext()
export const useTasks = () => useContext(TaskContext);

const initialTasks =  Array.from(taskData).map(data => (
    {...data, id: nanoid()}
));

const saveJson = (data) => 
    data && localStorage.setItem("tasks:", JSON.stringify(data));
const loadJson = (key) => JSON.parse(localStorage.getItem(key)) || [];

export default function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(loadJson("tasks:"));

    const addTask = (title, comment) => {
        setTasks([...tasks, {
            id: nanoid(),
            title: title,
            comment: comment,
            done: ""
        }]);
    }

    const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id))

    const updateTask = (obj) => {
        const updatedTasks = tasks.map(task => (task.id === obj.id) ? obj : task);
        setTasks(updatedTasks)
    }

    const toggleDone = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task))
    }

    useEffect(()=>{
        saveJson(tasks)
    }, [tasks])

    return (
        <TaskContext.Provider value={{tasks, addTask, updateTask, deleteTask, toggleDone}}>
            { children }
        </TaskContext.Provider>
    )
}
