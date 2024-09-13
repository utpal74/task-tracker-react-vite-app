
import React, { createContext, useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";

// For local storage (guest users)
const saveJson = (data) => data && localStorage.setItem("tasks", JSON.stringify(data));
const loadJson = (key) => JSON.parse(localStorage.getItem(key)) || [];

// Task Context
const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

// Helper function for getting the auth token
const getAuthToken = () => localStorage.getItem('authToken');

const BASE_URL = "http://localhost:8082"

// Function to fetch tasks from the API (signed-in users)
const loadTasksFromAPI = async () => {
    const token = getAuthToken();
    try {
        const response = await fetch(`${BASE_URL}/tasks`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            },
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to load tasks');
        }
    } catch (error) {
        console.error(error.message);
        return [];
    }
};

export default function TaskProvider({ children, isSignedIn }) {
    // const [tasks, setTasks] = useState([]);
    const [tasks, setTasks] = useState(() => {
        if (isSignedIn) return [];
        return loadJson("tasks");
    });

    // Fetch tasks on mount or when isSignedIn changes
    useEffect(() => {
        if (isSignedIn) {
            const fetchTasks = async () => {
                const taskFromAPI = await loadTasksFromAPI();
                setTasks(taskFromAPI);
            };
            fetchTasks();
        } else {
            setTasks(loadJson("tasks"));
        }
    }, [isSignedIn]);

    // Save tasks to local storage only if the user is not signed in
    useEffect(() => {
        if (!isSignedIn) {
            saveJson(tasks);
        }
    }, [tasks, isSignedIn]);

    // For Signed-in Users: Add a new task to the server
    const addTaskToAPI = async (title, comment) => {
        const newTask = { title, comment, done: false };
        const token = getAuthToken();

        try {
            const response = await fetch(`${BASE_URL}/tasks/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                const savedTask = await response.json();
                setTasks(prevTasks => [...prevTasks, savedTask]);
            } else {
                throw new Error('Failed to add task');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // For Guest Users: Add a new task to local storage
    const addTaskToLocal = (title, comment) => {
        const newTask = { id: nanoid(), title, comment, done: false };
        setTasks(prevTasks => [...prevTasks, newTask]);
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
            const token = getAuthToken();
            try {
                await fetch(`${BASE_URL}/tasks/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                });
            } catch (error) {
                console.error('Failed to delete task:', error);
            }
        }
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const updateTask = async (obj) => {
        if (isSignedIn) {
            const token = getAuthToken();
            try {
                await fetch(`${BASE_URL}/tasks/update/${obj.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                    body: JSON.stringify(obj),
                });
            } catch (error) {
                console.error('Failed to update task:', error);
            }
        }
        setTasks(prevTasks => prevTasks.map(task => task.id === obj.id ? obj : task));
    };

    const toggleDone = async (id) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        if (!taskToUpdate) return;

        const newDoneStatus = !taskToUpdate.done;

        if (isSignedIn) {
            const token = getAuthToken();
            try {
                await fetch(`${BASE_URL}/tasks/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                    body: JSON.stringify({ done: newDoneStatus }),
                });
            } catch (error) {
                console.error('Failed to update task:', error);
            }
        }

        setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, done: newDoneStatus } : task));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleDone }}>
            {children}
        </TaskContext.Provider>
    );
}
