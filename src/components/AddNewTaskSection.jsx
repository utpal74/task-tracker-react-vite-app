
import { useTasks } from "../hooks/task-hook";
import TaskForm from "./TaskForm";
import { useState } from "react";

export default function AddNewTaskSection() {
    const { tasks } = useTasks();
    const [isOpen, setIsOpen] = useState(false);

    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);

    return (
        <>
            {isOpen ?
                <TaskForm
                    handleClose={closeForm}
                /> :
                <button
                    onClick={openForm}
                    className="add-new-task-btn"
                >
                    {tasks.length > 0 ? "ADD ANOTHER TASK" : "ADD TASK"}
                </button>
            }
        </>
    )
}
