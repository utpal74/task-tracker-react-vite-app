
import EditableTaskList from "./EditableTaskList";
import AddNewTaskSection from "./AddNewTaskSection";

export default function TaskDashBoard() {
    return (
        <div className="task-dashboard">
            <h3>Task Dashboard</h3>
            <EditableTaskList />
            <AddNewTaskSection />
        </div>
    )
}
