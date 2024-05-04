
import { useTasks } from "../hooks/task-hook"
import { EditableTask } from "./EditableTask";

export default function EditableTaskList() {
    const {tasks} = useTasks();

    return (
        <div className="task-list">
            {tasks.map(task => 
                <EditableTask 
                    key={task.id} 
                    id={task.id}
                    title={task.title} 
                    comment={task.comment}
                    done={task.done}
                />)}
        </div>
    )
}
