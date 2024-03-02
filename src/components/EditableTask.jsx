
import { useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";

export function EditableTask({...props}) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    const openEditForm = () => { setIsEditOpen(true) }
    const closeEditForm = () => { setIsEditOpen(false) }
    
    return (
        <div className="editable-task">
            {isEditOpen ?
                <TaskForm {...props} handleClose={closeEditForm} />
                :
                <Task 
                    onEditOpen={openEditForm} 
                    onEditClose={closeEditForm}
                    {...props} 
                />
            }
        </div>
    )
}