
import { useTasks } from "../hooks/task-hook";
import { useInputs } from "../hooks/form-hook";

export default function TaskForm({ title, comment, id, handleClose }) {
    const {addTask, updateTask} = useTasks();
    const [titleProps, resetTitle] = useInputs(title || "")
    const [commentProps, resetComment] = useInputs(comment || "")
    const submitBtnText = id ? "Update" : "Add"

    const handleAddOrUpdateTasks = (e) => {
        e.preventDefault();
        id ? updateTask({
            id:id, 
            title:titleProps.value, 
            comment:commentProps.value
        }) : addTask(titleProps.value, commentProps.value)
        handleClose()
    }

    return (
        <div className="create-task-form">
            <input
                {...titleProps}
                className="fields"
                type="text"
                placeholder="Enter title"
                required
            />

            <input
                {...commentProps}
                className="fields"
                type="text"
                placeholder="Enter comments"
                required
            />
            <div>
                <button
                    className="fields update-task-btn"
                    onClick={handleAddOrUpdateTasks}
                >
                    {submitBtnText}
                </button>
                <button
                    className="fields cancel-task-btn"
                    onClick={handleClose}
                >Cancel</button>
            </div>

        </div>
    );
}
