
import EditableTaskList from "./EditableTaskList";
import AddNewTaskSection from "./AddNewTaskSection";

export default function TaskDashBoard() {
    return (
        <div className="task-dashboard">
            <EditableTaskList />
            <AddNewTaskSection />
        </div>
    )
}
