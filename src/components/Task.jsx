
import { CiEdit, CiTrash, CiCircleRemove } from "react-icons/ci";
import { useTasks } from "../hooks/task-hook";
import { useEffect, useState } from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

export default function Task({ id, title, comment, done, onEditOpen }) {
    const { deleteTask, toggleDone } = useTasks();
    const [dateAndTime, setDateAndTime] = useState(loadDateFromStorage())

    const handleDelete = (id) => {
        if (confirm("are you sure to delete? ")) {
            deleteTask(id)
        }
    }

    useEffect(() => {
        setDateAndTime(getCurrentDateAndTime)
    }, [dateAndTime])

    useEffect(() => {
        saveDateAndTime("task-time", dateAndTime)
    }, [dateAndTime])

    const taskStyle = done ? { backgroundColor: "green" } : { backgroundColor: "red" }
    const toggleTaskBtnElement = done ?
        <span className="tooltip_element">
            <IoCheckmarkDoneCircleOutline
                onClick={() => toggleDone(id)}
                className="task-control ci-done-btn"
                style={taskStyle}
            />
            <span className="tooltip">Mark done</span>
        </span>
        :
        <span className="tooltip_element">
            <CiCircleRemove
                onClick={() => toggleDone(id)}
                className="task-control ci-done-btn"
                style={taskStyle}
            />
            <span className="tooltip">Not done</span>
        </span>

    return (
        <>
            <div className="task">
                <div className="task-control-section">
                    <span className="tooltip_element">
                        <CiEdit
                            className="task-control ci-edit-btn"
                            onClick={onEditOpen}
                        />
                        <span className="tooltip">Edit</span>
                    </span>
                    <span className="tooltip_element">
                        <CiTrash
                            onClick={() => handleDelete(id)}
                            className="task-control ci-delete-btn"
                        />
                        <span className="tooltip">Delete</span>
                    </span>
                    {toggleTaskBtnElement}

                </div>
                <div className="task-detail">
                    <h2>{title}</h2>
                    <p className="task-comment">{comment}</p>
                </div>
                <p className="time-section">Last udpated:-<span>{dateAndTime}</span></p>
            </div>
        </>
    )
}


const getCurrentDateAndTime = () => {
    const date = new Date(Date.now());
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}

const saveDateAndTime = (key, data) => {
    data && localStorage.setItem(key, JSON.stringify(data))
}

const loadDateFromStorage = () => JSON.parse(localStorage.getItem("task-time"))
