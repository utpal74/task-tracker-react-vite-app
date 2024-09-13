
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import { useAuth } from '../hooks/AuthContext.jsx';

export default function Header({ handleToggleTask }) {
    const { isSignedIn, signOut } = useAuth();
    const navigate = useNavigate();

    return (
        <header>
            <div className="logo-section">
                <img src={logo} alt="TRACK MY TASK" />
            </div>
            <div className="header-btn-section">
                {isSignedIn ? (
                    <button
                        className="header-btn"
                        onClick={signOut}
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        className="header-btn"
                        onClick={() => navigate('/signin')}
                    >
                        Login
                    </button>
                )}
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
