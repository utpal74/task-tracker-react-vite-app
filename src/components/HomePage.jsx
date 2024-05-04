
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import TaskDescriptionSection from "./TaskDescriptionSection";

export default function HomePage() {
    const [toggleAddTask, setToggleAddTask] = useState(false);
    return (
        <div className='container'>
            <Header toggleAddTask={toggleAddTask} 
                handleToggleTask={(value)=>setToggleAddTask(value)} />
            <TaskDescriptionSection 
                toggleAddTask={toggleAddTask} 
                handleToggleTask={(value)=>setToggleAddTask(value)}
            />
            <Footer />
        </div>
    )
}