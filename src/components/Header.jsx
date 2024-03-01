
import { SiTask } from "react-icons/si";

export default function Header(){
    return (
        <div className="header">
            <div className="logo-section">
                <SiTask />
            </div>
            <button 
                className="header-btn add-task"
                onClick={()=>{ console.log('Task added') }}
            >
                Add task
            </button>
            <button 
                className="header-btn"
                onClick={()=>{ console.log('Task tracked') }}
            >
                View tasks
            </button>
        </div>
    );
}
