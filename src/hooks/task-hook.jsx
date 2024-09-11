
import { createContext, useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";

// For local storage (guest users)
const saveJson = (data) => data && localStorage.setItem("tasks:", JSON.stringify(data));
const loadJson = (key) => JSON.parse(localStorage.getItem(key)) || [];

// Task Context
const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

// Function to fetch tasks from the API (signed-in users)
const loadTasksFromAPI = async () => {
    try {
        const response = await fetch('http://localhost:8082/tasks');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to load tasks:', error);
        return [];
    }
};

export default function TaskProvider({ children, isSignedIn }) {
    const [tasks, setTasks] = useState(isSignedIn ? [] : loadJson("tasks:"));

    // For Signed-in Users: Add a new task to the server
    const addTaskToAPI = async (title, comment) => {
        const newTask = { title, comment, done: false };

        const response = await fetch('http://localhost:8082/tasks/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        });

        const savedTask = await response.json();
        setTasks([...tasks, savedTask]);
    };

    // For Guest Users: Add a new task to local storage
    const addTaskToLocal = (title, comment) => {
        const newTask = { id: nanoid(), title, comment, done: false };
        setTasks([...tasks, newTask]);
    };

    const addTask = (title, comment) => {
        if (isSignedIn) {
            addTaskToAPI(title, comment);
        } else {
            addTaskToLocal(title, comment);
        }
    };

    const deleteTask = async (id) => {
        if (isSignedIn) {
            await fetch(`http://localhost:8082/tasks/delete/${id}`, { method: 'DELETE' });
        }
        setTasks(tasks.filter(task => task.id !== id));
    };

    const updateTask = async (obj) => {
        if (isSignedIn) {
            await fetch(`http://localhost:8082/tasks/update/${obj.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
        }
        setTasks(tasks.map(task => (task.id === obj.id) ? obj : task));
    };

    const toggleDone = async (id) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        const newDoneStatus = !taskToUpdate.done;

        if (isSignedIn) {
            await fetch(`http://localhost:8082/tasks/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: newDoneStatus }),
            });
        }

        setTasks(tasks.map(task => task.id === id ? { ...task, done: newDoneStatus } : task));
    };

    useEffect(() => {
        if (isSignedIn) {
            const fetchTasks = async () => {
                const taskFromAPI = await loadTasksFromAPI();
                setTasks(taskFromAPI);
            };
            fetchTasks();
        }
    }, [isSignedIn]);

    useEffect(() => {
        if (!isSignedIn) {
            saveJson(tasks);
        }
    }, [tasks, isSignedIn]);

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleDone }}>
            {children}
        </TaskContext.Provider>
    );
}
