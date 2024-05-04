import React from "react";
import TaskDashBoard from "./TaskDashboard";

export default function TaskDescriptionSection({ toggleAddTask, handleToggleTask }){

    return (
        <div>
            { !toggleAddTask ?
            <section className="desc">
                <h2>Welcome to track my tak app - you can now track your task status from anywhere and pickup where you left off.</h2>
                <p>Go to 👉 
                    <button
                        className='add-task'
                        onClick={() => handleToggleTask(true)}
                    >
                        Task Dashboard
                    </button>
                </p>
            </section> : <TaskDashBoard />}
        </div>
    )
}

