
import { Link, useNavigate } from 'react-router-dom';
// import logo from "../assets/logo.png";
import logo_ai from "../assets/logo-ai.webp";
import { useAuth } from '../hooks/AuthContext.jsx';

export default function Header({ handleToggleTask }) {
    const { isSignedIn, signOut } = useAuth();
    const navigate = useNavigate();

    return (
        <header>
            <div className="head-container">
                <div className="logo-section">
                    <img src={logo_ai} alt="TRACK MY TASK" />
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
                </div>
            </div>
        </header>
    );
}
