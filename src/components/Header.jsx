
import logo from "../assets/logo.png";

export default function Header({ handleToggleTask }) {
    return (
        <header>
            <div className="logo-section">
                <img src={logo} alt="TRACK MY TASK" />
            </div>
            <div className="header-btn-section">
                <button
                    className="header-btn"
                    onClick={() => { handleToggleTask(true) }}
                >
                    Task Dashboard
                </button>
            </div>
        </header>
    );
}
